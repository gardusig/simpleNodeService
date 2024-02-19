FROM node:21-alpine
COPY app/ /app/
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm install --production
EXPOSE 3000
CMD ["npm", "run", "start"]
