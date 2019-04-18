FROM node:11.14.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies \
    && apk add --no-cache bash

RUN npm install && npm cache clean --force

EXPOSE 3000

CMD ["npm", "run", "start-prod"]
