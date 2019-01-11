FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json server.js webpack.config.js .babelrc ./
COPY src/ ./src/

RUN yarn install; \
    npm run build;

CMD ["/usr/local/bin/node", "./server.js"]

EXPOSE 3000



