# stage 1: building production build
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: deploying production build
EXPOSE 80
FROM nginx:alpine
COPY --from=0 /app/dist/web-portal /usr/share/nginx/html
