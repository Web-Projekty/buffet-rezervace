FROM node:22.23.2 AS node

WORKDIR /build

# Copy the contents of the frontend (React app) to the container
COPY ./buffet-app/ /build/

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

FROM php:8.3-apache-bookworm AS composer

WORKDIR /build

# Install tools
RUN apt-get update && apt-get install -y git unzip

# Install Composer
RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the contents of the backend (PHP app) to the container
COPY ./buffet-api/ /build/

# Copy PHP configuration
COPY buffet-api/php.ini /usr/local/etc/php/php.ini

# Production dependencies only (no phpunit/phpstan)
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Use PHP 8.3 as the base image
FROM php:8.3-apache-bookworm

# Původní php image s devcontainery
#FROM mcr.microsoft.com/devcontainers/php:8.3

# Install supervisor + PHP extensions in one layer. The -dev packages are only
# needed to compile GD, so they are purged afterwards; the runtime libraries
# stay. apt lists are removed so they don't end up in the image.
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        supervisor \
        libfreetype6 \
        libjpeg62-turbo \
        libpng16-16 \
        libwebp7; \
    savedAptMark="$(apt-mark showmanual)"; \
    apt-get install -y --no-install-recommends \
        libfreetype-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libwebp-dev; \
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp; \
    docker-php-ext-install -j"$(nproc)" gd mysqli pdo pdo_mysql; \
    apt-mark auto '.*' > /dev/null; \
    apt-mark manual $savedAptMark > /dev/null; \
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
    rm -rf /var/lib/apt/lists/*; \
    php -r 'exit(function_exists("imagewebp") && function_exists("imagecreatefromjpeg") && extension_loaded("pdo_mysql") ? 0 : 1);'

# Install apache mods
RUN a2enmod rewrite proxy proxy_http proxy_wstunnel

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy PHP configuration
COPY buffet-api/php.ini /usr/local/etc/php/php.ini

COPY buffet-api/src/WebSockets/apache.conf /etc/apache2/sites-available/000-default.conf

# Copy backend with composer packages
COPY --from=composer --chown=www-data:www-data /build/ /var/www/html/

# Copy built React app
COPY --from=node --chown=www-data:www-data /build/dist/ /var/www/html/dist/

# Run the post-create script
#RUN bash .devcontainer/start.sh d

CMD ["bash", "-c", "mkdir -p ./logs && supervisord -c ./src/WebSockets/supervisor.conf && apache2-foreground"]
