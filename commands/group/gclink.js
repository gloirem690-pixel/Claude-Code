// commands/group/gclink.js
export default {
  name: 'gclink',
  description: 'Obtenir le lien d’invitation du groupe',
  cooldown: 10,
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Groupe uniquement.' });
    try {
      const code = await sock.groupInviteCode(groupId);
      await sock.sendMessage(groupId, { text: `🔗 Lien du groupe :\nhttps://chat.whatsapp.com/${code}` });
    } catch (error) {
      sock.sendMessage(groupId, { text: '❌ Impossible de générer le lien (le bot doit être admin).' });
    }
  }
};