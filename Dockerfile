FROM node:22.12-bullseye

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","run","dev" ]

