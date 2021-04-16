#!/bin/bash
set -e


echo "生成搜索数据 ..."
node ./scripts/generate-search-data.js

# npm run build-schemas

echo "生成gh-page ..."
./node_modules/.bin/fis3 release gh-pages -c

# 拷贝一份兼容之前的访问路径
cp -r gh-pages/zh-CN/docs/* gh-pages/docs/

echo "构建项目 build.sh ..."
sh build.sh

cp ./schema.json ./gh-pages

tar -zcvf sdk.tar.gz sdk

mv sdk.tar.gz gh-pages/

# 加这个 github page 就不会忽略下划线开头的文件
touch gh-pages/.nojekyll
echo "docker build ..."
docker build -f ./examples/Dockerfile -t docker.jitalab.com/jeata/doc/amis .

echo "docker pubsh ..."
docker push docker.jitalab.com/jeata/doc/amis

