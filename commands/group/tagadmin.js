// commands/group/tagadmin.js
export default {
  name: 'tagadmin',
  description: 'Mentionne tous les administrateurs du groupe',
  cooldown: 20,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    if (!remoteJid.endsWith('@g.us')) return sock.sendMessage(remoteJid, { text: '❌ Commande réservée aux groupes.' });
    const metadata = await sock.groupMetadata(remoteJid);
    const admins = metadata.participants.filter(p => p.admin && p.id !== sock.user.id).map(p => p.id);
    if (admins.length === 0) return sock.sendMessage(remoteJid, { text: 'Aucun autre administrateur.' });
    const mentionText = admins.map(u => `@${u.split('@')[0]}`).join('\n');
    await sock.sendMessage(remoteJid, {
      text: `╭─⌈ Admin Alert ⌋\n│\n${mentionText}\n│\n╰─⌊ DC243 ⌉`,
      mentions: admins
    });
  }
};