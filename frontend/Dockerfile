FROM node:lts-alpine3.10

WORKDIR /app

COPY ./src /app/src
COPY ./public /app/public

COPY package.json /app/
COPY .env.local /app/

RUN yarn
