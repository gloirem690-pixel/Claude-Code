// commands/admin/setreaction.js
import configmanager from '../../utils/configmanager.js';
import bug from '../../utils/bug.js';

function isEmoji(str) {
  const emojiRegex = /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})$/u;
  return emojiRegex.test(str);
}

export default {
  name: 'setreaction',
  description: 'Changer l’emoji d’auto‑réaction',
  adminOnly: true,
  cooldown: 5,
  async execute(sock, msg, args) {
    const number = sock.user.id.split(':')[0];
    const remoteJid = msg.key.remoteJid;
    const emoji = args[0];
    if (!emoji || !isEmoji(emoji)) return sock.sendMessage(remoteJid, { text: '❌ Fournis un émoji valide.' });
    if (!configmanager.config.users[number]) configmanager.config.users[number] = {};
    configmanager.config.users[number].reaction = emoji;
    configmanager.save();
    await bug(msg, sock, `Émoji changé : ${emoji}`, 3);
  }
};