# frontend/Dockerfile

FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Use NGINX to serve the built app
FROM nginx:alpine
COPY --from=builder /app/dist/skillsmatchai/* /usr/share/nginx/html/
EXPOSE 80
