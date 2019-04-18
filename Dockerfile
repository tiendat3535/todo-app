FROM node:11.14.0-alpine

EXPOSE 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY dist config seeders package.json .babelrc ./

COPY dist .

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

RUN npm install && npm cache clean --force

CMD ["npm", "run", "start-prod"]