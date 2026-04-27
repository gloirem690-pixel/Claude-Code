// commands/admin/setprefix.js
import configmanager from '../../utils/configmanager.js';
import bug from '../../utils/bug.js';

export default {
  name: 'setprefix',
  description: 'Changer le préfixe du bot',
  adminOnly: true,
  cooldown: 5,
  async execute(sock, msg, args) {
    const number = sock.user.id.split(':')[0];
    const remoteJid = msg.key.remoteJid;
    const newPrefix = args[0];
    if (!newPrefix) return sock.sendMessage(remoteJid, { text: '❌ Fournis un nouveau préfixe (ex: .setprefix !)' });
    if (!configmanager.config.users[number]) configmanager.config.users[number] = {};
    configmanager.config.users[number].prefix = newPrefix;
    configmanager.save();
    await bug(msg, sock, `Préfixe changé en : ${newPrefix}`, 3);
  }
};