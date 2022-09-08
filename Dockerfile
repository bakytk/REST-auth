FROM node:14-alpine

WORKDIR /file-app

COPY package*.json ./
RUN npm ci
COPY .env ./
COPY src src

EXPOSE 11000

CMD [ "npm", "start" ]
