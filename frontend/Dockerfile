# ============================
#  Stage 1 — Build Frontend
# ============================
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Inject API URL explicitly during build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# 👇 Make sure VITE_API_URL is visible when Vite builds
RUN echo "VITE_API_URL=$VITE_API_URL" > .env.production && \
    npm run build


# ============================
#  Stage 2 — Serve via Nginx
# ============================
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
