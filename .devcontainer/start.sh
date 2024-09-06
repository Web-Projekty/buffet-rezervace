## declare variables
containerWorkspace=$(pwd)
export WORKSPACE_DIR=$(pwd)

## npm service config
apt-get update && apt-get install -y supervisor
sudo cp /workspaces/buffet-rezervace/.devcontainer/npm_serv.conf /etc/supervisor/conf.d/
sudo supervisord -c /etc/supervisor/supervisord.conf
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start npm_serv

## apache config

sudo a2enmod rewrite
sudo a2enmod actions
sudo a2enmod headers
sudo service apache2 restart

## html folder clone
sudo rm -r /var/www/html
ln -s $containerWorkspace/html /var/www/html
