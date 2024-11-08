#!/bin/bash

docker exec -it php-apache /var/www/html/vendor/bin/phpunit tests --testdox --colors=always --coverage-text
#docker exec -it php-apache /var/www/html/vendor/bin/phpunit tests --coverage-text

# export XDEBUG_MODE=debug