# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN sed -i "s|base: '/webprofile/'|base: '/'|" vite.config.js
RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Default Vite port or Nginx default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Pull the latest multi-platform image
#docker pull asiffmahmad/web-profile:latest

# Run the container
#docker run -d -p 80:80 --name web-profile asiffmahmad/web-profile:latest

