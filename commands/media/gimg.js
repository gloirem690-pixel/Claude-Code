export default {
  name: 'gimg',
  cooldown: 15,
  async execute(sock, msg, args) {
    const prompt = args.join(' ');
    if (!prompt) return sock.sendMessage(msg.key.remoteJid, { text: '❓ .gimg un chat' });
    const remoteJid = msg.key.remoteJid;
    await sock.sendPresenceUpdate('composing', remoteJid);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&model=flux`;
    await sock.sendMessage(remoteJid, { image: { url }, caption: `✨ ${prompt}` });
  }
};