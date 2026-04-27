// commands/group/kickall2.js
export default {
  name: 'kickall2',
  description: 'Expulser tous les membres non-admins (en une seule requête)',
  cooldown: 60,
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Groupe uniquement.' });
    try {
      const metadata = await sock.groupMetadata(groupId);
      const targets = metadata.participants.filter(p => !p.admin).map(p => p.id);
      if (targets.length === 0) return sock.sendMessage(groupId, { text: 'Aucun membre non-admin.' });
      await sock.sendMessage(groupId, { text: `⚡ One shot – expulsion de ${targets.length} membres...` });
      await sock.groupParticipantsUpdate(groupId, targets, 'remove');
      await sock.sendMessage(groupId, { text: '✅ Tous exclus.' });
    } catch (error) {
      console.error(error);
      sock.sendMessage(groupId, { text: '❌ Erreur (le bot doit être admin).' });
    }
  }
};