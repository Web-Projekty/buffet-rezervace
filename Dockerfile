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

RUN composer install --no-interaction

# Use PHP 8.3 as the base image
FROM php:8.3-apache-bookworm

# Původní php image s devcontainery
#FROM mcr.microsoft.com/devcontainers/php:8.3

# Enable Apache rewrite module
RUN a2enmod rewrite

# Install tools
RUN apt-get update && apt-get install -y git unzip zip curl supervisor

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

#PHP GD dependencies
RUN apt-get install -y \
		libfreetype-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
        libpng-dev \
        libwebp-dev \
        libgd-dev

# Configure and install PHP GD
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
&& docker-php-ext-install -j$(nproc) gd

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
