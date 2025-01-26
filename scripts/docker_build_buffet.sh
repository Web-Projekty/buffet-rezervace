#!/bin/bash
docker builder prune -f
docker run --rm -t -v $(pwd)/../buffet-app:/app -w /app node:latest sh -c "echo 'Installing npm packges:' && npm install && npm run build"
docker run --rm -t -v $(pwd)/../buffet-api:/app -w /app composer:lts sh -c "echo 'Installing compooser packges:' && composer install"
cd ..
rm -rf buffet-api/dist
cp -r buffet-app/dist buffet-api
docker build -t wlczak/buffet:latest .
docker push wlczak/buffet # can replace wlczak with your dockerhub username
