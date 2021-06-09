#!/usr/bin/env bash

# This script will run when starting a Docker container for deployment
# Buildle the webpack/react application
# npm run build
# Start nginx
nginx -g "daemon off;"
