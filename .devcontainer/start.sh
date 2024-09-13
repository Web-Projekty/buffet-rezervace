## declare variables
containerWorkspace=$(pwd)
export WORKSPACE_DIR=$(pwd)

## change rights
apply_permissions() {
    sudo chown -R vscode:vscode "$containerWorkspace"
    sudo usermod -aG vscode www-data
    sudo chmod -R 770 "$containerWorkspace"
}

new_config() {
    # configure npm
    apt-get update && apt-get install -y supervisor
    sudo cp /workspaces/buffet-rezervace/.devcontainer/npm_serv.conf /etc/supervisor/conf.d/
    sudo supervisord -c /etc/supervisor/supervisord.conf

    # configure apache and php.ini
    sudo cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini
    sudo sed -i 's/;extension=mysqli/extension=mysqli/' /usr/local/etc/php/php.ini
    sudo docker-php-ext-install mysqli # install mysqli extension

    # configure apache2 directly
    sudo a2enmod rewrite
    sudo a2enmod actions
    sudo a2enmod headers
    sudo service apache2 restart

    # configure .env
    sudo su - vscode -c "bash $containerWorkspace/.devcontainer/env.sh $containerWorkspace"
}

# Check if the first argument is 'd' or if user input is needed
if [[ "$1" == "d" ]]; then
    # Automatically apply permissions
    apply_permissions
else
    # Prompt for user input
    read -p "Do you want a complete config? (y/n) " choice
    if [[ "$choice" == [Yy]* ]]; then

        new_config
        apply_permissions

    elif [[ "$choice" == [Nn]* ]]; then
        echo "nice :-)"
    else
        echo "Invalid input. Please enter 'y' or 'n'."
    fi
fi

## npm service config

sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start npm_serv

# compose buffet-api
sudo su - vscode -c "cd /workspaces/buffet-rezervace/buffet-api && composer install"

## html folder clone
sudo rm -r /var/www/html
ln -s $containerWorkspace/buffet-api /var/www/html
