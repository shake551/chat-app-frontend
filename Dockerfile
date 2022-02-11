FROM node:16.13.0-alpine3.12
ENV NODE_VERSION 14.18.1
WORKDIR /app
EXPOSE 3000

RUN npm install -g create-react-app