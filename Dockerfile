FROM node:18 AS dev

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

RUN yarn build



FROM node:18 AS prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --prod

COPY . .

EXPOSE 5000

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
