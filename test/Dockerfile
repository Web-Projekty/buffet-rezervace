# Start with the base PHP image
FROM php:8.3-alpine3.20

# Install main binaries
RUN apk add --no-cache \
    bash \
    git \
    unzip \
    libzip-dev \
    oniguruma-dev \
    autoconf \
    build-base

# Install PHP extensions
RUN apk add --no-cache php83-mysqli

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PCOV for PHPUnit
RUN pecl install pcov \
    && echo 'extension=pcov.so' >> /usr/local/etc/php/php.ini \
    && echo 'pcov.enabled=1' >> /usr/local/etc/php/php.ini

# Set the default command to run bash (can be changed based on your needs)
CMD ["bash"]
