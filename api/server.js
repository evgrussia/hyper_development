/**
 * Order API: POST /send-order → Telegram.
 * Env: TELEGRAM_BOT_TOKEN (required), TELEGRAM_CHAT_ID (default 219800788).
 * Same logic as frontend/api/send-order.ts for VPS deployment.
 */

const express = require('express');
const app = express();

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '219800788';
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

function buildMessage(p, moduleNames) {
  const lines = [
    '🆕 Новая заявка с сайта',
    '',
    `👤 Имя: ${p.name}`,
    `📱 Контакт: ${p.contact}`,
    '',
  ];
  if (p.description?.trim()) {
    lines.push('📝 Описание:');
    lines.push(p.description.trim());
    lines.push('');
  }
  if (moduleNames?.length) {
    lines.push('📦 Модули: ' + moduleNames.join(', '));
  }
  return lines.join('\n');
}

app.options('/send-order', (_req, res) => {
  res.status(204).end();
});

app.post('/send-order', async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'TELEGRAM_BOT_TOKEN not configured' });
  }

  const body = req.body;
  if (!body?.name?.trim() || !body?.contact?.trim()) {
    return res.status(400).json({ error: 'name and contact are required' });
  }

  const text = buildMessage(
    {
      name: body.name.trim(),
      contact: body.contact.trim(),
      description: body.description,
      modules: body.modules,
    },
    body.moduleNames
  );

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    });

    const data = await tgRes.json().catch(() => ({}));
    if (!tgRes.ok || !data.ok) {
      return res.status(502).json({ error: 'Telegram API error', details: data });
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to send to Telegram' });
  }
});

app.listen(PORT, () => {
  console.log(`Order API listening on port ${PORT}`);
});
