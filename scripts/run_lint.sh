clear
docker exec -it php-apache /var/www/html/vendor/bin/phpstan analyse --autoload-file vendor/autoload.php --level 1 src tests