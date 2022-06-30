FROM alpine:3.15

ENV NODE_VERSION 16.15.1

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]