FROM node:21.7.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD [ "npm", "run", "start:dev" ]