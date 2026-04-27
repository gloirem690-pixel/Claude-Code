// commands/group/checkwarns.js
import { warnStorage } from '../../utils/groupStore.js';

export default {
  name: 'checkwarns',
  aliases: ['warns'],
  description: 'Afficher les avertissements du groupe',
  cooldown: 5,
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Groupe uniquement.' });
    const warnKeys = Object.keys(warnStorage).filter(key => key.startsWith(groupId + '_'));
    if (warnKeys.length === 0) return sock.sendMessage(groupId, { text: '✅ Aucun warn dans ce groupe.' });
    let report = '📊 *Liste des Warns*\n\n';
    for (const key of warnKeys) {
      const userId = key.split('_')[1];
      const warnCount = warnStorage[key];
      report += `@${userId.split('@')[0]} : ${warnCount}/3 warns\n`;
    }
    await sock.sendMessage(groupId, { text: report });
  }
};