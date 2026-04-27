// commands/group/kickall.js
export default {
  name: 'kickall',
  description: 'Expulser tous les membres non-admins (boucle)',
  cooldown: 60,
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Groupe uniquement.' });
    try {
      const metadata = await sock.groupMetadata(groupId);
      const targets = metadata.participants.filter(p => !p.admin).map(p => p.id);
      if (targets.length === 0) return sock.sendMessage(groupId, { text: 'Aucun membre non-admin.' });
      await sock.sendMessage(groupId, { text: `⚡ Purge de ${targets.length} membres...` });
      for (const target of targets) {
        try {
          await sock.groupParticipantsUpdate(groupId, [target], 'remove');
        } catch (e) {}
      }
      await sock.sendMessage(groupId, { text: '✅ Purge terminée.' });
    } catch (error) {
      console.error(error);
      sock.sendMessage(groupId, { text: '❌ Erreur lors de la purge.' });
    }
  }
};