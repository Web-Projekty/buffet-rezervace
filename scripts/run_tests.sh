#!/bin/bash

clear

rm ../buffet-api/test-db/database.sqlite
touch ../buffet-api/test-db/database.sqlite
sqlite3 ../buffet-api/test-db/database.sqlite < ../buffet-api/test-db/testing.db
docker exec -it php-apache_dev /var/www/html/vendor/bin/phpunit tests --testdox --colors=always --coverage-text --coverage-html tests/result --display-deprecations --display-phpunit-deprecations --fail-on-deprecation --fail-on-phpunit-deprecation
#docker exec -it php-apache /var/www/html/vendor/bin/phpunit tests --coverage-text

# export XDEBUG_MODE=debug
