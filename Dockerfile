FROM node:16.15.1-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY ./ ./

ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "run", "start:prod"]

