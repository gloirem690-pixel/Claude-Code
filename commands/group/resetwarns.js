// commands/group/resetwarns.js
import { warnStorage } from '../../utils/groupStore.js';

export default {
  name: 'resetwarns',
  description: 'Réinitialiser les avertissements d’un utilisateur',
  cooldown: 5,
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Groupe uniquement.' });
    let target;
    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      target = msg.message.extendedTextMessage.contextInfo.participant;
    } else if (args[0]) {
      target = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
      const warnKeys = Object.keys(warnStorage).filter(key => key.startsWith(groupId + '_'));
      const count = warnKeys.length;
      return sock.sendMessage(groupId, { text: `📊 *Warns :* ${count} utilisateur(s)\n\nUsage : .resetwarns @user` });
    }
    const warnKey = `${groupId}_${target}`;
    if (warnStorage[warnKey]) {
      delete warnStorage[warnKey];
      await sock.sendMessage(groupId, { text: `✅ Warns réinitialisés pour @${target.split('@')[0]}.`, mentions: [target] });
    } else {
      sock.sendMessage(groupId, { text: `ℹ️ Aucun warn pour @${target.split('@')[0]}.` });
    }
  }
};