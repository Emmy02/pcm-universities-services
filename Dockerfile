FROM node:lts
WORKDIR /
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 3000
RUN npm install -g nodemon
CMD ["node", "index.js"]