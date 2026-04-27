import settings from '../../config/settings.js';
export default {
  name: 'gpt',
  cooldown: 10,
  async execute(sock, msg, args) {
    const q = args.join(' ');
    if (!q) return sock.sendMessage(msg.key.remoteJid, { text: '.gpt <question>' });
    const wait = await sock.sendMessage(msg.key.remoteJid, { text: '🤔 ...' });
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${settings.openrouterApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'openai/gpt-oss-120b:free', messages: [{ role: 'user', content: q }] })
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'Erreur';
    await sock.sendMessage(msg.key.remoteJid, { text: `🧠 GPT:\n${reply.slice(0, 4000)}` });
    await sock.sendMessage(msg.key.remoteJid, { delete: wait.key });
  }
};