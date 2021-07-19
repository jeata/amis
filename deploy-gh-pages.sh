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

ServerUpdateShell="ssh bj-ecs-001.n.jitalab.com sudo /data/services/update-docker/jeata-doc-amis.sh"
SchemaUpdateShell="scp ./schema.json bj-ecs-001.n.jitalab.com:/data/webapps/schema.jeata.com/schemas/schema.json"

# 询问是否更新服务器
echo "\033[31m"
read -r -p "是否更新服务器 [Y/n] " isUpdate
echo "\033[0m"

# 是否更细服务器
case $isUpdate in
    [yY][eE][sS]|[yY])
    echo "\033[34m更新服务器 ...\033[0m"
	  eval $ServerUpdateShell
	  ret=$?
	  if [ $ret -ne 0 ]; then
      echo "\033[31m错误:\033[0m 更新服务器失败"
      exit $ret
    fi
	  echo "\033[1;32m更新服务器完成！ \033[0m"
		;;
    *)
		echo "\033[33m不更新服务器\033[0m"
		;;
esac

if [[ $isUpdate =~ ^[yY][eE][sS]|[yY]$ ]]; then
  echo "\033[34m更新Schema ...\033[0m"
	eval $SchemaUpdateShell
  ret=$?
  if [ $ret -ne 0 ]; then
    echo "\033[31m错误:\033[0m 更新Schema失败"
    exit $ret
  fi

  echo "\033[34m刷新CDN目录 ...\033[0m"
  ./refresh-cdn.py -i ${ALIYUN_CDN_REFRESH_AK} -k ${ALIYUN_CDN_REFRESH_SK} -r ./refresh-cdn-list.txt -t clear -o Directory
fi

echo "\033[1;32m构建成功！ \033[0m"

