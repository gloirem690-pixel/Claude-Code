// commands/group/tag.js
export default {
  name: 'tag',
  description: 'Mentionne tous les membres avec un message personnalisé',
  cooldown: 20,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    if (!remoteJid.endsWith('@g.us')) return sock.sendMessage(remoteJid, { text: '❌ Commande réservée aux groupes.' });
    const metadata = await sock.groupMetadata(remoteJid);
    const participants = metadata.participants.map(p => p.id);
    const text = args.join(' ') || 'Digital Crew Alert';
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (quoted?.stickerMessage) {
      await sock.sendMessage(remoteJid, { sticker: quoted.stickerMessage, mentions: participants });
    } else {
      await sock.sendMessage(remoteJid, { text, mentions: participants });
    }
  }
};