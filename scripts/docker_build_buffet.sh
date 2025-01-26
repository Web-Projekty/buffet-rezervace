#!/bin/bash
cd ..
docker builder prune
docker build -t wlczak/buffet:latest .
docker push wlczak/buffet # can replace wlczak with your dockerhub username
