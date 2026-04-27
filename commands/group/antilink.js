// commands/group/antilink.js
import { antilinkSettings, warnStorage } from '../../utils/groupStore.js';

export default {
  name: 'antilink',
  description: 'Configurer la protection anti‑liens',
  cooldown: 5,
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Groupe uniquement.' });
    const action = args[0]?.toLowerCase();
    if (!action) {
      const usage = `🔒 *Anti‑liens*\n\n.antilink on\n.antilink off\n.antilink set delete | kick | warn\n.antilink status`;
      return sock.sendMessage(groupId, { text: usage });
    }
    try {
      const metadata = await sock.groupMetadata(groupId);
      const senderId = msg.key.participant || groupId;
      const sender = metadata.participants.find(p => p.id === senderId);
      if (!sender?.admin) return sock.sendMessage(groupId, { text: '🔒 *Admins uniquement !*' });
      switch (action) {
        case 'on':
          antilinkSettings[groupId] = { enabled: true, action: 'delete' };
          await sock.sendMessage(groupId, { text: '✅ Antilink activé' });
          break;
        case 'off':
          delete antilinkSettings[groupId];
          await sock.sendMessage(groupId, { text: '❌ Antilink désactivé' });
          break;
        case 'set':
          if (!args[1]) return sock.sendMessage(groupId, { text: '❌ Usage: .antilink set delete | kick | warn' });
          const setAction = args[1].toLowerCase();
          if (!['delete', 'kick', 'warn'].includes(setAction)) {
            return sock.sendMessage(groupId, { text: '❌ Actions: delete, kick, warn' });
          }
          if (!antilinkSettings[groupId]) antilinkSettings[groupId] = { enabled: true, action: setAction };
          else antilinkSettings[groupId].action = setAction;
          await sock.sendMessage(groupId, { text: `✅ Action mise à jour : ${setAction}` });
          break;
        case 'status':
          const status = antilinkSettings[groupId];
          await sock.sendMessage(groupId, { text: `📊 *Statut*\n\nActivé: ${status?.enabled ? '✅' : '❌'}\nAction: ${status?.action || 'Aucune'}` });
          break;
        default:
          await sock.sendMessage(groupId, { text: '❌ Utilisation: .antilink on/off/set/status' });
      }
    } catch (error) {
      console.error('Antilink error:', error);
      sock.sendMessage(groupId, { text: '❌ Erreur.' });
    }
  }
};