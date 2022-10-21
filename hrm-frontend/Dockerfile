FROM node:current-alpine3.16 as dev

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install && npm install -g @angular/cli@latest

COPY . .

RUN ng build

FROM node:current-alpine3.16 as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

CMD ["ng", "serve"]