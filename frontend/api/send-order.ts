/**
 * Serverless endpoint: приём заявки с лендинга и отправка в Telegram.
 * Vercel (Root Directory = frontend): api/send-order.ts.
 * Env: TELEGRAM_BOT_TOKEN (обязательно), TELEGRAM_CHAT_ID (по умолчанию 219800788).
 */

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '219800788';

type OrderPayload = {
  name: string;
  contact: string;
  description?: string;
  modules?: string[];
};

function buildMessage(p: OrderPayload, moduleNames?: string[]): string {
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

export default async function handler(
  req: { method?: string; body?: OrderPayload & { moduleNames?: string[] } },
  res: {
    status: (n: number) => { end: () => void; json: (o: object) => void };
    setHeader: (name: string, value: string) => void;
  }
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    res.status(500).json({ error: 'TELEGRAM_BOT_TOKEN not configured' });
    return;
  }

  const body = req.body;
  if (!body?.name?.trim() || !body?.contact?.trim()) {
    res.status(400).json({ error: 'name and contact are required' });
    return;
  }

  const text = buildMessage(
    { name: body.name.trim(), contact: body.contact.trim(), description: body.description, modules: body.modules },
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
      res.status(502).json({ error: 'Telegram API error', details: data });
      return;
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to send to Telegram' });
  }
}
