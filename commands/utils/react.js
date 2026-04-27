// commands/utils/react.js
export default {
  name: 'react',
  description: 'Réagir à un message avec 🐦‍🔥',
  cooldown: 3,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    await sock.sendMessage(remoteJid, { react: { text: '🐦‍🔥', key: msg.key } });
  }
};