FROM node:alpine3.11
WORKDIR /usr/code
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3004
CMD ["npm", "run", "start", "dev"]