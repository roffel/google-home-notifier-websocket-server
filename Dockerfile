FROM node:latest
RUN apt-get update
RUN apt-get install git-core libnss-mdns libavahi-compat-libdnssd-dev -yy
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --save
COPY . .