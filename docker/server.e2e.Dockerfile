FROM node:16 AS raw
COPY e2e/ /app/e2e/
WORKDIR /app/e2e
RUN npm install

FROM raw as test
CMD ["npm", "run", "test"]
