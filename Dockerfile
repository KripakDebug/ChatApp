FROM node:18-alpine

WORKDIR /app

COPY package*.json index.js index.html ./
COPY assets ./assets/

RUN npm install --production

EXPOSE 3000

CMD node index.js
