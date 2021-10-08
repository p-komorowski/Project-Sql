FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g ts-node
RUN npm install

COPY . .

CMD [ "npm","start"]
