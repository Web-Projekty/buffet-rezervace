## declare variables
containerWorkspace=$(pwd)

## apache config

sudo a2enmod rewrite
sudo a2enmod actions
sudo a2enmod headers
sudo service apache2 restart

## html folder clone
sudo rm -r /var/www/html
ln -s $containerWorkspace/html /var/www/html
