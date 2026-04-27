// commands/group/join.js
export default {
  name: 'join',
  description: 'Rejoindre un groupe via un lien WhatsApp',
  cooldown: 30,
  async execute(sock, msg, args) {
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
    const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i);
    if (!match) return sock.sendMessage(msg.key.remoteJid, { text: '❌ Fournissez un lien valide : .join https://chat.whatsapp.com/xxxx' });
    try {
      await sock.groupAcceptInvite(match[1]);
      await sock.sendMessage(msg.key.remoteJid, { text: '✅ Rejoint le groupe.' });
    } catch (error) {
      sock.sendMessage(msg.key.remoteJid, { text: '❌ Impossible de rejoindre (lien invalide ou déjà membre).' });
    }
  }
};