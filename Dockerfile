FROM node:16.15.1-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm ci

RUN rm -rf ./dist || true

RUN npm run build

CMD ["npm", "run", "start:prod"]

