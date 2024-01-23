FROM node:16 AS raw
COPY server/ /app/server/
WORKDIR /app/server
RUN npm install

FROM raw AS lint
CMD ["npm", "run", "lint"]

FROM raw AS build
CMD ["npm", "run", "build"]

FROM build AS run
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

FROM node:16 AS final
WORKDIR /app/server
COPY --from=build /app/server/dist /app/server/dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
