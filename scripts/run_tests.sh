#!/bin/bash

docker exec -it php-apache /var/www/html/vendor/bin/phpunit tests --testdox --colors=always