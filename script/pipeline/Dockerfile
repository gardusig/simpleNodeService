FROM alpine:latest AS base
RUN apk add git docker docker-compose
COPY ./ /repo
WORKDIR /repo
ENTRYPOINT ["/bin/sh", "-c"]

FROM base AS lint
CMD ["./script/lint.sh"]

FROM base AS test
CMD ["./script/start.sh" && "./script/test.sh"]
