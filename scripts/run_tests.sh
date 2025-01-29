#!/bin/bash

clear
docker exec -it php-apache_dev /var/www/html/vendor/bin/phpunit tests --testdox --colors=always --coverage-text --coverage-html tests/result --display-deprecations --display-phpunit-deprecations --fail-on-deprecation --fail-on-phpunit-deprecation
#docker exec -it php-apache /var/www/html/vendor/bin/phpunit tests --coverage-text

# export XDEBUG_MODE=debug
