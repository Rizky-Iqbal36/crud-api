FROM node:12-alpine

ARG APP_ENV=kubectl
ENV APP_ENV=${APP_ENV}

RUN apk add --no-cache bash

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]