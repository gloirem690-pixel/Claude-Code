// commands/group/tagall.js
export default {
  name: 'tagall',
  description: 'Mentionne tous les membres du groupe',
  cooldown: 30,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    if (!remoteJid.endsWith('@g.us')) return sock.sendMessage(remoteJid, { text: '❌ Commande réservée aux groupes.' });
    const metadata = await sock.groupMetadata(remoteJid);
    const participants = metadata.participants.map(p => p.id);
    const mentionText = participants.map(u => `@${u.split('@')[0]}`).join(' \n');
    await sock.sendMessage(remoteJid, {
      text: `╭─⌈ CyberSec Crew ⌋\n│\n${mentionText}\n│\n╰─⌊ DC243 ⌉`,
      mentions: participants
    });
  }
};