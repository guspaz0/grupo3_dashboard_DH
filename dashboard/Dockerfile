FROM node:20-alpine

WORKDIR /usr/code

COPY ["package.json", "vite.config.js","index.html", ".eslintrc.cjs", "/src/", "/public/", "/usr/code/"]

RUN npm install

EXPOSE 8080