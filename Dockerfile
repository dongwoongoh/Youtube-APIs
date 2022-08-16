FROM node:16.15.1-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY ./ ./

ENV SERVER_PORT=6464

RUN npm run build

CMD ["npm", "run", "start:prod"]

