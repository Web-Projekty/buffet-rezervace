## declare variables
containerWorkspace=$(pwd)
export WORKSPACE_DIR=$(pwd)

## npm service config
apt-get update && apt-get install -y supervisor
sudo supervisord -c /etc/supervisor/supervisord.conf
sudo cp $containerWorkspace/.devcontainer/npm_serv.conf /etc/supervisor/conf.d/

## apache config

sudo a2enmod rewrite
sudo a2enmod actions
sudo a2enmod headers
sudo service apache2 restart

## html folder clone
sudo rm -r /var/www/html
ln -s $containerWorkspace/html /var/www/html
