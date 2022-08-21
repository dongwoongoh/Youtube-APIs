FROM node:16.15.1-alpine

WORKDIR /app/server

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g dotenv-cli
RUN npm i -g prisma
RUN npm ci

COPY ./ ./

RUN prisma generate
RUN npm run build

CMD ["npm", "run", "start:prod"]

