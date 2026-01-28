# Hyper-Development frontend (Vite + React) — multi-stage
# Деплой только через git: на сервере git pull && docker compose build && up -d

# --- Stage 1: build ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci 2>/dev/null || npm install

COPY . .

RUN npm run build && \
    rm -rf node_modules

# --- Stage 2: serve ---
FROM nginx:alpine

RUN apk add --no-cache dumb-init wget

COPY --from=builder /app/dist /usr/share/nginx/html

# SPA fallback: все маршруты → index.html
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri $uri/ /index.html; } \
    location /health { return 200 "ok"; add_header Content-Type text/plain; } \
  }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
