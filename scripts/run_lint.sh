clear
docker exec -it php-apache_dev /var/www/html/vendor/bin/phpstan analyse -c phpstan.neon --memory-limit 2G --autoload-file vendor/autoload.php src tests
