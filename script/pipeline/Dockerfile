FROM alpine:latest AS base
RUN apk add git docker docker-compose
COPY ./ /repo
WORKDIR /repo

FROM base AS lint
CMD ["/bin/sh", "-c", "./script/lint.sh"]

FROM base AS test
CMD ["/bin/sh", "-c", "./script/start.sh && ./script/test.sh"]
