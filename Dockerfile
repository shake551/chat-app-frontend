FROM node:16.13.0
ENV NODE_VERSION 14.18.1
WORKDIR /app
EXPOSE 3000

COPY app/package.json app/package-lock.json ../

RUN npm install
RUN npm install -g create-react-app
RUN npm install styled-components
RUN npm install react-icons --save
RUN npm install swr
