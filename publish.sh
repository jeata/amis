#!/bin/bash
set -e

rm -rf npm
mkdir npm

cp -rf lib npm
cp package.json npm
cp schema.json npm
cp -rf scss npm
cp -rf docs npm
cp -rf examples npm
# cp -rf sdk npm

cd npm

sed -i '' -e 's/\"name\": \"amis\"/\"name\": \"@jeata\/amis\"/g' ./package.json

echo "发布"
# npm publish --registry=https://nexus.jitalab.com/repository/npm/
npm publish
cd ..
# rm -rf npm
