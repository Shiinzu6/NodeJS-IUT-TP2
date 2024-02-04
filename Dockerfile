FROM node:lts-bullseye-slim

WORKDIR /home/node/app

COPY package*.json ./

RUN /home/node/app/node_module

USER node

RUN npm install

COPY . .

CMD ["npm", "start"]

