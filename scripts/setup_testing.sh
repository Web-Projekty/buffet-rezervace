#!/bin/bash

docker exec -it php-apache_dev /bin/bash -c "pecl install pcov"
docker exec -it php-apache_dev /bin/bash -c "echo 'extension=pcov.so' >> /usr/local/etc/php/php.ini"
docker exec -it php-apache_dev /bin/bash -c "echo 'pcov.enabled=1' >> /usr/local/etc/php/php.ini"