export default {
  name: 'getpp',
  description: 'Récupérer la photo de profil d\'un utilisateur',
  cooldown: 5,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    let targetJid;
    if (args[0] && args[0].includes('@')) {
      targetJid = args[0];
    } else if (msg.message?.extendedTextMessage?.contextInfo?.participant) {
      targetJid = msg.message.extendedTextMessage.contextInfo.participant;
    } else if (remoteJid.includes('@g.us')) {
      targetJid = remoteJid;
    } else {
      targetJid = sock.user.id;
    }
    try {
      const url = await sock.profilePictureUrl(targetJid, 'image');
      await sock.sendMessage(remoteJid, { image: { url }, caption: '📸 Photo récupérée' });
    } catch {
      sock.sendMessage(remoteJid, { text: '❌ Aucune photo trouvée.' });
    }
  }
};