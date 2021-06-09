#!/bin/bash
git pull
npm install
npm run build
# Read out the version and store in .env.heartbeat in BE directory
VERSION=$(cat env.json | grep -Po '(?<="version": ")[\d\.]*')
echo FE_VERSION=$VERSION > /var/www/xchangerate-be/.env.heartbeat
chmod 755 /var/www/xchangerate-be/.env.heartbeat
