## declare variables
containerWorkspace=$(pwd)
export WORKSPACE_DIR=$(pwd)

## changes rights
sudo chown -R vscode:vscode $containerWorkspace
sudo usermod -aG vscode www-data
sudo chmod -R 770 $containerWorkspace

## npm service config
apt-get update && apt-get install -y supervisor
sudo cp /workspaces/buffet-rezervace/.devcontainer/npm_serv.conf /etc/supervisor/conf.d/
sudo supervisord -c /etc/supervisor/supervisord.conf
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start npm_serv

## apache config not in use
sudo su - vscode -c "cd /workspaces/buffet-rezervace/buffet-api && composer install"
sudo a2enmod rewrite
sudo a2enmod actions
sudo service apache2 restart

## html folder clone
sudo rm -r /var/www/html
ln -s $containerWorkspace/buffet-api /var/www/html