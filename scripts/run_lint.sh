clear
docker exec -it php-apache /var/www/html/vendor/bin/phpstan analyse -c phpstan.neon --autoload-file vendor/autoload.php src tests