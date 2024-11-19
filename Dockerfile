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

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install apache mods
RUN a2enmod rewrite proxy proxy_http proxy_wstunnel

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the contents of the backend (PHP app) to the container
#COPY ./buffet-api/ /var/www/html/

# Install composer
#RUN composer install --no-interaction

# Expose port 80 for the web server
EXPOSE 80

# Run the post-create script
#RUN bash .devcontainer/start.sh d

#CMD ["bash", "-c", "tail -f /dev/null"]
