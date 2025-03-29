#!/bin/bash
# docker builder prune -f
cd ..
cd buffet-app
echo 'Installing npm packges:' && npm install && npm run build
cd ..

cd buffet-api
echo 'Installing compooser packges:' && composer install --no-dev --optimize-autoloader
cd ..

rm -rf buffet-api/dist
cp -r buffet-app/dist buffet-api

# old build
# docker build -t wlczak/buffet:latest . 

### Using new docker builder
echo ${DOCKER_TOKEN} | docker login --username wlczak --password-stdin
docker buildx create --use --name mybuilder # Create builder
docker buildx inspect mybuilder --bootstrap # Test builder output
docker buildx build --platform linux/amd64,linux/arm64/v8 -t wlczak/buffet --push .

### Old docker builder
#docker push wlczak/buffet # can replace wlczak with your dockerhub username
