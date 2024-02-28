FROM node:21-alpine AS base
COPY app/ /app/
WORKDIR /app
RUN npm install

FROM base AS lint
CMD ["npm", "run", "lint"]

FROM base AS e2e
RUN npm run prisma:generate
CMD ["npm", "run", "test"]
