#!/bin/bash

clear
docker exec -it php-apache /var/www/html/vendor/bin/phpunit tests --testdox --colors=always --coverage-text --display-deprecations --display-phpunit-deprecations --fail-on-deprecation --fail-on-phpunit-deprecation
#docker exec -it php-apache /var/www/html/vendor/bin/phpunit tests --coverage-text

# export XDEBUG_MODE=debug
