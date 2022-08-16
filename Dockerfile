FROM node:16.15.1-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]

