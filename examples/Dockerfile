FROM caddy:2-alpine

ENV NODE_ENV production

COPY ./examples/Caddyfile /etc/caddy/Caddyfile
COPY gh-pages /usr/share/caddy/amis

# 修改构建时间
RUN echo `date "+%Y%m%d%H%M"` > /data/build.txt
