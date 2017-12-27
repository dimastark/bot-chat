#!/usr/bin/env bash

# react-scripts build
echo 'Creating an optimized production build...'
./node_modules/.bin/react-scripts build &>/dev/null

cd build
cp static/css/*.css bot-chat.css
cp static/js/*.js bot-chat.js

# cleanup
rm -rf static asset-manifest.json service-worker.js index.html

echo 'Compiled successfully.'
