docker run --rm -t -v $(pwd)/../buffet-app:/app -w /app node:latest sh -c "echo 'Installing npm packges:' && npm install && npm run build"
cd ..
rm -rf buffet-api/dist
cp -r buffet-app/dist buffet-api
