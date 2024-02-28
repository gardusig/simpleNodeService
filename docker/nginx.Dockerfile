FROM nginx:1.25-alpine
COPY ./docker/config/nginx.conf /etc/nginx/nginx.conf.template
COPY ./docker/config/certificate/server.crt /etc/nginx/certs/server.crt
COPY ./docker/config/certificate/server.key /etc/nginx/certs/server.key
CMD /bin/sh -c "\
    envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf \
    && nginx -g 'daemon off;' \
    "
