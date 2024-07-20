FROM node:20-alpine

COPY ["package.json", "package-lock.json", "/usr/code/"]

WORKDIR /usr/code

RUN npm install

EXPOSE 3000