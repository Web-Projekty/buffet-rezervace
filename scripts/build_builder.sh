docker buildx build --platform linux/amd64,linux/arm64 -t php:8.3-apache-bookworm --output type=tar,dest=builder-image/php-image.tar pre-pull

docker build -t wlczak/buffet-builder:latest builder-image
docker push wlczak/buffet-builder # can replace wlczak with your dockerhub username

#rm builder-image/php-image.tar