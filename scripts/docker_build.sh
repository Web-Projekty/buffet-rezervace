#!/bin/bash

docker build -t wlczak/buffet-test-prebuild:latest test-image
docker push wlczak/buffet-test-prebuild # can replace wlczak with your dockerhub username