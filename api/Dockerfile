# Order API (Node) — POST /send-order → Telegram
# Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (optional)

FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci 2>/dev/null || npm install

COPY server.js .

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]
