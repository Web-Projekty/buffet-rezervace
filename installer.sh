#!/bin/bash

URL_COMPOSE="https://vlastas.cc/buffet-conf/compose.yaml"
URL_ENV="https://vlastas.cc/buffet-conf/.env"
URL_SQL="https://vlastas.cc/buffet-conf/blank.sql"
URL_BACKUP="https://vlastas.cc/buffet-conf/buffet-backup.sh"

ENV_DECRYPT_KEY=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 128; echo)
DB_ROOT_PASSWORD=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 64; echo)
DB_USERNAME=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 8; echo)
DB_PASSWORD=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 64; echo)

E_GENFAILURE=1			# Failure outside of script
E_NOROOTORSUDO=77		# User executing the script is neither root nor written in the /etc/sudoers file
E_EXITEDBYUSER=78		# User exited the program
E_HOWTF=100			# This error code shouldn't have happened (unless the script has been manipulated)

if [[ $(whoami) == "root" ]]; then
	SUDO_STR=""
elif ! eval sudo -l &>/dev/null; then
	echo 'Err077: sudo or root privileges are needed to run this script'
	whiptail --msgbox "Pro spuštění tohoto skriptu je potřeba být zapsán v souboru /etc/sudoers nebo mít rootovská oprávnění." --title 'Rootovská oprávnění' 0 0
	exit $E_NOROOTORSUDO
else
	SUDO_STR="sudo"
fi

DISTRO=$(grep -oP '(?<=^ID=).+' /etc/os-release | tr -d '"')
# Natively supported: debian, ubuntu, fedora, centos
SUPPORTED_DISTROS=("debian" "ubuntu" "fedora" "centos")

if [[ $(arch) = "aarch64" ]]; then
        ARCH="arm64"
else
        ARCH=$(arch);
fi

for i in {0..3}; do
	if [[ ${SUPPORTED_DISTROS[$i]} == "$DISTRO" ]]; then
		TEMP="s_true"
		break
	fi
done

if [[ $TEMP == "s_true" ]]; then
	whiptail --msgbox "Vítejte v instalačním skriptu pro aplikaci buffet. Tento skript pro vás nainstaluje všechny potřebné závislosti a provede vás základní konfigurací.\n\nDistribuce: $DISTRO\nArchitektura: $ARCH\n\nNyní zkontrolujeme závislosti potřebné pro spuštění aplikace buffet." --title 'Vítejte!' 0 0
else
	TEMP=$(whiptail --title 'Vítejte!' --menu "Vítejte v instalačním skriptu pro aplikaci buffet. Tento skript pro vás nainstaluje všechny potřebné závislosti a provede vás základní konfigurací.\n\nDistribuce: $DISTRO\nArchitektura: $ARCH\n\nVaše distribuce není oficiálně podporovaná. Vyberte, prosím, níže distribuci, ke které má ta vaše nejblíže.\n" 0 0 0 1 "Debian" 2 "Ubuntu" 3 "Fedora" 4 "CentOS"  3>&1 1>&2 2>&3 3>&-)
	DISTRO=${SUPPORTED_DISTROS[$TEMP-1]}
fi

echo "Updating repositories (where applicable)"
case $DISTRO in
	"debian")
	PACMAN_INSTALL="apt install"
	bash -c "$SUDO_STR apt update"
	;;
	"ubuntu")
	PACMAN_INSTALL="apt install"
	bash -c "$SUDO_STR apt update"
	;;
	"fedora")
	PACMAN_INSTALL="dnf upgrade --refresh"
	bash -c "$SUDO_STR dnf update"
	;;
	"centos")
	PACMAN_INSTALL="yum install"
	;;
	*)
	echo "Err100: Shouldn't have happened exception"
	exit $E_HOWTF
	;;
esac

echo "Checking if wget is installed"
if command -v wget &>/dev/null; then
	echo "Wget is installed."
else
	echo "Wget is not installed. Installing"
	bash -c "$SUDO_STR $PACMAN_INSTALL wget"
	if command -v wget &>/dev/null; then
		echo "Wget successfully installed."
	else
		echo "Wget could not be installed. Aborting"
		whiptail --msgbox "Nepodařilo se nainstalovat nástroj wget.\n\nNa následujícím odkazu najdete veškeré instrukce pro jeho instalaci. Pro informace se také můžete podívat do výstupu tohoto skriptu po jeho ukončení. Nainstalujte wget a poté tento skript spusťte znovu.\n\nhttps://www.gnu.org/software/wget/" --title "Instalace závislostí: wget" 0 0
		exit $E_GENFAILURE
	fi
fi

echo "Checking if Cron is installed"
if command -v crontab &>/dev/null; then
	echo "Cron is installed."
else
	echo "Cron is not installed. Installing"
	if [[ $DISTRO == "debian" || $DISTRO == "ubuntu" ]]; then
		bash -c "$SUDO_STR $PACMAN_INSTALL cron"
	elif [[ $DISTRO == "centos" ]]; then
		bash -c "$SUDO_STR $PACMAN_INSTALL crontabs"
	elif [[ $DISTRO == "fedora" ]]; then
		bash -c "$SUDO_STR $PACMAN_INSTALL cronie cronie-anacron"
	else
		echo "Err100: Doesn't have instructions how to install crontab on this system" && exit $E_HOWTF
	fi
	if command -v crontab &>/dev/null; then
		echo "Cron successfully installed."
	else
		echo "Cron could not be installed. Aborting"
		whiptail --msgbox "Nepodařilo se nainstalovat nástroj Cron.\n\nNa následujícím odkazu najdete veškeré instrukce pro jeho instalaci. Pro informace se také můžete podívat do výstupu tohoto skriptu po jeho ukončení. Nainstalujte Cron a poté tento skript spusťte znovu.\n\nhttps://google.com/" --title "Instalace závislostí: htpasswd" 0 0
		exit $E_GENFAILURE
	fi
fi

echo "Checking if htpasswd is installed"
if command -v htpasswd &>/dev/null; then
	echo "htpasswd is installed."
else
	echo "htpasswd is not installed. Installing"
	if [[ $DISTRO == "debian" || $DISTRO == "ubuntu" ]]; then
		bash -c "$SUDO_STR $PACMAN_INSTALL apache2-utils"
	else
		bash -c "$SUDO_STR $PACMAN_INSTALL httpd-tools"
	fi
	if command -v htpasswd &>/dev/null; then
		echo "htpasswd successfully installed."
	else
		echo "htpasswd could not be installed. Aborting"
		whiptail --msgbox "Nepodařilo se nainstalovat nástroj htpasswd.\n\nNa následujícím odkazu najdete veškeré instrukce pro jeho instalaci. Pro informace se také můžete podívat do výstupu tohoto skriptu po jeho ukončení. Nainstalujte htpasswd a poté tento skript spusťte znovu.\n\nhttps://httpd.apache.org/docs/current/programs/htpasswd.html" --title "Instalace závislostí: htpasswd" 0 0
		exit $E_GENFAILURE
	fi
fi

echo "Checking if Docker is installed"
if command -v docker &>/dev/null; then
	echo "Docker is installed."
else
	echo "Docker is not installed. Prompting user if they want to install Docker with convenience script"
	whiptail --title "Instalace závislostí: Docker" --yesno "Na vašem zažízení není nainstalovaný Docker.\n\nTento skript ho pro vás může nainstalovat automaticky pomocí skriptu.\nTo obecně není doporučeno, protože je tento skript určen pro rychlou instalaci v testovacím a vývojovém prostředí.\n\nPokud chcete Docker nainstalovat automaticky, zvolte ano.\n\nPokud si Docker nainstalujete sami, zvolte ne. (Doporučeno)" 0 0 --defaultno && TEMP="dckr_inst_yes" || TEMP="dckr_inst_no"
	if [[ $TEMP == "dckr_inst_yes" ]]; then
		echo "Chosen automatic Docker installation."
		echo "Downloading script from https://get.docker.com/"
		wget -O docker-install-script.sh https://get.docker.com/ || (echo "Script could not be downloaded. Aborting" && exit $E_GENFAILURE)
		chmod u+x docker-install-script.sh
		bash -c "$SUDO_STR sh docker-install-script.sh"
		if [[ "$DISTRO" == "fedora" || "$DISTRO" == "centos" ]]; then
			bash -c "$SUDO_STR systemctl start docker" || echo "Couldn't launch Docker service after automatic installation."
		fi
		if command -v docker &>/dev/null; then
			echo "Docker successfully installed."
		else
			echo "Docker couldn't be installed. Aborting"
			whiptail --msgbox "Docker se nepodařilo nainstalovat.\n\nNa následujícím odkazu najdete veškeré instrukce pro jeho instalaci. Pro informace se také můžete podívat do výstupu tohoto skriptu po jeho ukončení. Nainstalujte Docker manuálně a poté tento skript spusťte znovu.\n\nhttps://docs.docker.com/engine/install/" --title "Instalace závislostí: Docker compose" 0 0
			rm docker-install-script.sh
			exit $E_GENFAILURE
		fi
		rm docker-install-script.sh
	else
		echo "Chosen manual Docker installation. Exiting"
		whiptail --msgbox "Byla zvolena manuální instalace Dockeru.\n\nNa následujícím odkazu najdete veškeré instrukce pro instalaci Docker Engine. Nainstalujte Docker, a poté tento skript spusťte znovu.\n\nhttps://docs.docker.com/engine/install/" --title "Instalace závislostí: Docker" 0 0
		exit 0
	fi
fi

echo "Checking if docker-compose or compose module is installed"
if command -v docker-compose &>/dev/null; then
	echo "Docker compose is installed as a standalone package. Using \"docker-compose\" command"
	DOCKER_COMPOSE="docker-compose"
elif eval docker compose version &>/dev/null; then
	echo "Docker compose is installed as a Docker plugin. Using \"docker compose\" command"
	DOCKER_COMPOSE="docker compose"
else
	echo "Neither docker-compose nor compose plugin is installed. Starting installation"
	whiptail --msgbox "Na vašem zařízení není nainstalován Docker compose v žádné formě. Nyní vám do Dockeru nainstalujeme plugin compose." --title "Instalace závislostí: Docker compose" 0 0
	bash -c "$SUDO_STR $PACMAN_INSTALL docker-compose-plugin"
	if eval docker compose version &>/dev/null; then
		echo "Docker compose plugin successfully installed."
	else
		echo "Docker compose couldn't be installed. Aborting"
		whiptail --msgbox "Plugin compose se nepodařilo nainstalovat.\n\nNa následujícím odkazu najdete veškeré instrukce pro jeho instalaci. Pro informace se také můžete podívat do výstupu tohoto skriptu po jeho ukončení. Nainstalujte plugin Compose a poté tento skript spusťte znovu.\n\nhttps://docs.docker.com/compose/install/linux/" --title "Instalace závislostí: Docker compose" 0 0
		exit $E_GENFAILURE
	fi
fi

whiptail --msgbox "Všechny závislosti jsou úspěšně nainstalovány.\n\nNyní vás provedeme prvotní konfigurací aplikace buffet. \nDodatečné nastavení je možné upravit až po instalaci aplikace ve webovém rozhraní." --title "Konfigurace"  0 0

# Getting configuration from user

ENV_PORT=$(whiptail --title 'Lokální port' --inputbox "Aplikace buffet bude lokálně hostovaná na portu, jehož číslo zadáte níže.\n\nVýchozí doporučené nastavení je port 8099. Pokud je toto jediná webová aplikace, kterou na tomto zařízení provozujete, můžete nastavit port 80." 0 0 "8099" 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)

while [[ $ENV_PORT =~  [^0-9] || $ENV_PORT -gt 65535 || $ENV_PORT -lt 1 ]]; do
	ENV_PORT=$(whiptail --title 'Lokální port' --inputbox "Aplikace buffet bude lokálně hostovaná na portu, jehož číslo zadáte níže.\n\nVýchozí doporučené nastavení je port 8099. Pokud je toto jediná webová aplikace, kterou na tomto zařízení provozujete, můžete nastavit port 80.\n\nZadejte číslo v rozmezí 1 - 65535" 0 0 "8099" 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)
done

ENV_URL=$(whiptail --title 'Veřejná URL adresa' --inputbox "Zadejte, prosím, níže veřejnou URL adresu, na které bude aplikace buffet přístupná.\n\nNapř. https://buffet.spseplzen.cz" 0 0 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)

ADMIN_USERNAME=$(whiptail --title 'Účet administrátora' --inputbox "Nyní vám vytvoříme administrátorský uživatelský účet.\n\nTento účet bude vždy aktivní bez ohledu na zvolenou přihlašovací metodu pro ostatní uživatele a má přiřazena všechna oprávnění. Dodatečné údaje (e-mailová adresa, celé jméno aj.) lze doplnit v nastavení.\n\nUživatelské jméno a heslo si dobře zapamatujte či uložte na bezpečné místo, neboť jej nelze obnovit.\n\nZadejte jméno pro místní administrátorský účet aplikace." 0 30 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)

while [[ $ADMIN_USERNAME =~  [^a-zA-Z0-9\-\_] || ${#ADMIN_USERNAME} -lt 3 ]]; do
	ADMIN_USERNAME=$(whiptail --title 'Účet administrátora' --inputbox "Uživatelské jméno může obsahovat pouze velká a malá písmena, čísla, pomlčku (-) a podtržítko (_)\n\nZadejte jméno pro místní administrátorský účet aplikace." 0 30 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)
done

ADMIN_PASSWORD="Meow? (Waiting for"
ADMIN_PASSWORD_CONFIRM="something to happen?)"
while [[ $ADMIN_PASSWORD != $ADMIN_PASSWORD_CONFIRM ]]; do

	ADMIN_PASSWORD=$(whiptail --title 'Účet administrátora' --passwordbox "\nZadejte heslo pro administrátorský účet.\n\nHeslo by mělo mít minimálně 8 znaků." 10 50 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)

	while [[ ${#ADMIN_PASSWORD} -lt 8 ]]; do
		ADMIN_PASSWORD=$(whiptail --title 'Účet administrátora' --passwordbox "\nZadejte heslo pro administrátorský účet.\n\nNeplatné heslo. Heslo by mělo mít minimálně 8 znaků." 11 50 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)
	done

	ADMIN_PASSWORD_CONFIRM=$(whiptail --title 'Účet administrátora' --passwordbox "\nPro potvrzení zadejte heslo pro administrátorský účet ještě jednou." 10 50 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)

	if [[ $ADMIN_PASSWORD != $ADMIN_PASSWORD_CONFIRM ]]; then
		whiptail --title 'Účet administrátora' --msgbox "\nHesla se neshodují." 10 50
	fi
done

DCKR_KUMA_PORT=$(whiptail --title 'Monitorovací nástroj Kuma' --inputbox "Spolu s aplikací buffet vám bude nainstalován i monitorovací nástroj Uptime Kuma. Ten slouží ke zjištění případných výpadků a jiných problémů s chodem aplikace a jejím přístupu.\n\nNíže zadejte port, na kterém bude Kuma běžet. Doporučujeme ponechat výchozí hodnotu 8098." 0 0 "8098" 3>&1 1>&2 2>&3 3>&-) || (echo "User exited with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)

while [[ $DCKR_KUMA_PORT =~  [^0-9] || $DCKR_KUMA_PORT -gt 65535 || $DCKR_KUMA_PORT -lt 1 ]]; do
	DCKR_KUMA_PORT=$(whiptail --title 'Monitorovací nástroj Kuma' --inputbox "Spolu s aplikací buffet vám bude nainstalován i monitorovací nástroj Uptime Kuma. Ten slouží ke zjištění případných výpadků a jiných problémů s chodem aplikace a jejím přístupu.\n\nNíže zadejte port, na kterém bude Kuma běžet. Doporučujeme ponechat výchozí hodnotu 8098.\n\nZadejte číslo v rozmezí 1 - 65535" 0 0 "8098" 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)
done

# Setting up configs

echo "Creating directory buffet-rezervace"
mkdir buffet-rezervace
cd buffet-rezervace || (echo "Could not enter buffet-rezervace directory. Aborting" && exit $E_GENFAILURE)

echo "Downloading compose.yaml file"
wget -O "compose.yaml" "$URL_COMPOSE" || (echo "Error downloading compose.yaml from $URL_COMPOSE, please find alternative source URL, paste it in URL_COMPOSE constant and try again. Aborting" && exit $E_GENFAILURE)

echo "Adjusting compose.yaml"
sed -i -e "s#{ENV_PORT}#$ENV_PORT#g" compose.yaml
sed -i -e "s#{DB_ROOT_PASSWORD}#$DB_ROOT_PASSWORD#g" compose.yaml
sed -i -e "s#{DB_USERNAME}#$DB_USERNAME#g" compose.yaml
sed -i -e "s#{DB_PASSWORD}#$DB_PASSWORD#g" compose.yaml
sed -i -e "s#{DCKR_KUMA_PORT}#$DCKR_KUMA_PORT#g" compose.yaml

echo "Creating directory buffet-rezervace/conf"
mkdir conf
cd conf || (echo "Could not enter buffet-rezervace/conf directory. Aborting" && exit $E_GENFAILURE)

echo "Downloading .env file"
wget -O ".env" "$URL_ENV" || (echo "Error downloading .env from $URL_ENV, please find alternative source URL, paste it in URL_ENV constant and try again. Aborting" && exit $E_GENFAILURE)

echo "Adjusting .env"
sed -i -e "s#{ENV_DECRYPT_KEY}#$ENV_DECRYPT_KEY#g" .env
sed -i -e "s#{ENV_URL}#$ENV_URL#g" .env
DB_USERNAME_ENC=$(echo -n "$DB_USERNAME" | openssl enc -aes-256-ecb -base64 -K "$(echo -n $ENV_DECRYPT_KEY | xxd -p -c 256)" -iv 0 | tr -d '\n')
sed -i -e "s#{DB_USERNAME_ENC}#$DB_USERNAME_ENC#g" .env
DB_PASSWORD_ENC=$(echo -n "$DB_PASSWORD" | openssl enc -aes-256-ecb -base64 -K "$(echo -n $ENV_DECRYPT_KEY | xxd -p -c 256)" -iv 0 | tr -d '\n')
sed -i -e "s#{DB_PASSWORD_ENC}#$DB_PASSWORD_ENC#g" .env

cd .. || (echo "Could not enter buffet-rezervace directory. Aborting" && exit $E_GENFAILURE)
echo "Creating directory buffet-rezervace/sql"
mkdir sql
cd sql || (echo "Could not enter buffet-rezervace/sql directory. Aborting" && exit $E_GENFAILURE)

echo "Downloading blank.sql file"
wget -O "blank.sql" "$URL_SQL" || (echo "Error downloading blank.sql from $URL_SQL, please find alternative source URL, paste it in URL_SQL constant and try again. Aborting" && exit $E_GENFAILURE)

echo "Adjusting blank.sql"
sed -i -e "s#{ADMIN_USERNAME}#$ADMIN_USERNAME#g" blank.sql
ADMIN_PASSWORD_ENC=$(htpasswd -nbBC 10 'a' "$ADMIN_PASSWORD" | cut -c 3- | tr -d '\n')
sed -i -e "s#{ADMIN_PASSWORD_ENC}#$ADMIN_PASSWORD_ENC#g" blank.sql
sed -i -e "s#{ADMIN_FULLNAME}#$ADMIN_USERNAME#g" blank.sql
sed -i -e "s#{ADMIN_EMAIL}#0#g" blank.sql
cd .. || (echo "Could not enter buffet-rezervace directory. Aborting" && exit $E_GENFAILURE)

# Launch app on startup prompt

echo "Prompting user for launch-app-on-startup"
whiptail --title "Spuštění při startu" --yesno "Přejete si spouštět aplikaci buffet automaticky po startu zařízení?" 0 0 && TEMP="cronjob_add_yes" || TEMP="cronjob_add_no"
if [[ $TEMP == "cronjob_add_yes" ]]; then
	echo "User prompted for launch-app-on-startup, adding cronjob"
	crontab -l | { cat; echo "@reboot cd $(pwd) && $DOCKER_COMPOSE up -d"; } | crontab -
else
	echo "User prompted against launch-app-on-startup, continuing"
fi

# Setting up backups

echo "Prompting user for backup settings"
whiptail --title "Zálohy" --yesno "Aplikaci buffet je doporučeno pravidelně zálohovat. Tento skript pro vás může nainstalovat jednoduchý zálohovací skript.\n\nPokud zvolíte ano, v dalších krocích nakonfigurujeme zálohy tak, aby vám vyhovovaly.\n\nPřejete si provádět pravidelné zálohy aplikace buffet?" 0 0 && TEMP="backup_yes" || TEMP="backup_no"
if [[ $TEMP == "backup_yes" ]]; then
	echo "User prompted for backups, setting up"
	echo "Downloading backup script file"
	wget -O "buffet-backup.sh" "$URL_BACKUP" || (echo "Error downloading buffet-backup.sh file from $URL_ENV, please find alternative source URL, paste it in URL_BACKUP constant and try again. Aborting" && exit $E_GENFAILURE)
	sed -i -e "s#{PROJECT_DIR}#$(pwd)#g" buffet-backup.sh
	TEMP=$(whiptail --title 'Zálohy: Cílový adresář' --inputbox "Zvolte cestu k adresáři, kam se budou zálohy ukládat. Výchozí hodnota je aktuální adresář projektu.\n\nCesta nesmí končit lomítkem.\n" 0 0 "$(pwd)" 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)
	sed -i -e "s#{BACKUP_DIR}#$TEMP#g" buffet-backup.sh
	whiptail --title "Zálohy: Živé zálohy" --defaultno --yesno "Zálohy můžou probíhat i během chodu aplikace. To obecně není doporučeno, protože může dojít k vytvoření poničené a nepoužitelné zálohy bez varování. Pokud ale chcete, aby byla aplikace buffet přístupná 24/7, můžou být živé zálohy jedinný způsob, jak data zálohovat.\n\nPokud zvolíte ne, bude během zálohování aplikace buffet nepřístupná.\n\nChcete umožnit živé zálohy?" 0 0 && TEMP="live_backup_yes" || TEMP="live_backup_no"
	if [[ $TEMP == "live_backup_yes" ]]; then
		sed -i -e "s#{INITIAL_COMMANDS}#echo 'No initial commands'#g" buffet-backup.sh
		sed -i -e "s#{CONCLUDING_COMMANDS}#echo 'No concluding commands'#g" buffet-backup.sh
	else
		sed -i -e "s#{INITIAL_COMMANDS}#cd $(pwd) \&\& $DOCKER_COMPOSE down#g" buffet-backup.sh
		sed -i -e "s#{CONCLUDING_COMMANDS}#cd $(pwd) \&\& $DOCKER_COMPOSE up -d#g" buffet-backup.sh
	fi
	chmod u+x "buffet-backup.sh" || (echo "Couldn't set user executable permission on buffet-backup.sh. Aborting" && exit $E_GENFAILURE)
	TEMP=$(whiptail --title 'Zálohy: Interval' --inputbox "Nyní je potřeba určit, kdy se budou zálohy provádět.\n\nZadejte interval spuštění pro Cron. Výchozí nastavení je každý den ve 2 hodiny ráno.\n\nLegenda:\n .------------ minuta (0 - 59)          #   '*' = jakoukoli (např. minutu)\n | .---------- hodina (0 - 23)          #   \n | | .-------- den v měsíci (1 - 31)    #   '*/2' = každou druhou (např. hodinu)\n | | | .------ měsíc (1 - 12)           #   \n | | | | .---- den v týdnu (1 - 7)      #   '3' = vždy, když je třetí (hodina, měsíc, ...)\n | | | | |\n * * * * *" 0 0 "0 2 * * *" 3>&1 1>&2 2>&3 3>&-) || (echo "User exited the program with 'Cancel' button. Exiting" && exit $E_EXITEDBYUSER)
	crontab -l | { cat; echo "$TEMP cd $(pwd) && bash buffet-backup.sh"; } | crontab -
else
	echo "User prompted against backups, continuing"
fi

# Installation

whiptail --title 'Zahájení instalace' --msgbox "Nyní je vše připraveno a instalace může začít. Ta může, podle výkonu vašeho zařízení a rychlosti připojení k internetu trvat i několik desítek minut." 0 0

bash -c "$DOCKER_COMPOSE up -d"

whiptail --title 'Konfigurace monitoringu Kuma' --msgbox "Instalace je skoro hotová. Nyní přejdeme k rychlému nastavení monitoringu Uptime Kuma.\n\nVe svém webovém prohlížeči zadejte IP adresu tohoto zařízení, následovanou ':$DCKR_KUMA_PORT' (např. http://127.0.0.1:$DCKR_KUMA_PORT)\n\nZaregistrujte se a najděte tlačítko 'Přidat nový dohled'. Přidejte následujcí záznamy:\n\nJméno / Friendly name | Typ dohledu   | URL / Connection String\nBuffet Web - Lokální  | HTTP(s)       | http://buffet-web/\nBuffet Web - Vzdálený | HTTP(s)       | $ENV_URL\nBuffet DB             | MySQL/MariaDB | mysql://$DB_USERNAME:$DB_PASSWORD@buffet-db:3306/buffet\n\nPokud všechny svítí zeleně, znamená to, že všechny části aplikace běží a jsou přístupné." 0 0

whiptail --title 'Dokončení instalace' --msgbox "A je to! Aplikace by nyní měla běžet na pozadí. Můžete si jí vyzkoušet lokálně (na tomto zařízení) na adrese http://127.0.0.1:$ENV_PORT.\n\nAby byla aplikace buffet plně funkční, je potřeba zprovoznit reverzní proxy tak, aby byla aplikace přístupná na adrese, kterou jste zadali dříve. Nezapomeňte přidat kompatibilitu s WebSockety.\n\nDěkujeme, že jste si nainstalovali aplikaci buffet!" 0 0

