# Use PHP 8.3 as the base image
FROM php:8.3-apache-bookworm

# Původní php image s devcontainery
#FROM mcr.microsoft.com/devcontainers/php:8.3

# Enable Apache rewrite module
RUN a2enmod rewrite

# Install composer
RUN apt-get update && apt-get install -y git unzip zip curl supervisor

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN docker-php-ext-enable imagick

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install apache mods
RUN a2enmod rewrite proxy proxy_http proxy_wstunnel

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the contents of the backend (PHP app) to the container
COPY ./buffet-api/ /var/www/html/

# Install composer
#RUN composer install --no-interaction

# Expose port 80 for the web server
EXPOSE 80

# Run the post-create script
#RUN bash .devcontainer/start.sh d

CMD ["bash", "-c", "mkdir -p ./logs && cp ./src/WebSockets/apache.conf /etc/apache2/sites-available/000-default.conf && composer install && supervisord -c ./src/WebSockets/supervisor.conf && usermod -a -G root www-data && chown -R www-data:www-data /var/www/html/conf && apache2-foreground"]