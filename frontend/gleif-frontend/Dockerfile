# ===============================
# Stage 1: Build React (Vite) app
# ===============================
FROM node:20-alpine AS build

WORKDIR /app

# Accept API URL from docker-compose
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copy package files and install ALL dependencies (including dev)
COPY package*.json ./
RUN npm install --include=dev

# Copy all source files
COPY . .

# Ensure Node type definitions are installed for TypeScript
RUN npm install --save-dev @types/node

# Build the frontend app
RUN npm run build

# ===============================
# Stage 2: Serve with nginx
# ===============================
FROM nginx:alpine

# Copy custom nginx configuration if available
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose web port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
