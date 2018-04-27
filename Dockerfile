FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm install -g nodemon
EXPOSE 3000
CMD [ "nodemon", "./bin/run.js" ]