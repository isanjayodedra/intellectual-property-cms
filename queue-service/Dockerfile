FROM node:16-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY src ./src
CMD ["npm", "run", "start"]
