// commands/admin/setwelcome.js
import configmanager from '../../utils/configmanager.js';
import bug from '../../utils/bug.js';

export default {
  name: 'setwelcome',
  description: 'Activer/désactiver le message de bienvenue',
  adminOnly: true,
  cooldown: 5,
  async execute(sock, msg, args) {
    const number = sock.user.id.split(':')[0];
    const remoteJid = msg.key.remoteJid;
    const state = args[0]?.toLowerCase();
    if (!state || (state !== 'on' && state !== 'off')) {
      return sock.sendMessage(remoteJid, { text: 'Utilisation: .setwelcome on/off' });
    }
    if (!configmanager.config.users[number]) configmanager.config.users[number] = {};
    configmanager.config.users[number].welcome = (state === 'on');
    configmanager.save();
    await bug(msg, sock, `Bienvenue ${state === 'on' ? 'activé' : 'désactivé'}`, 3);
  }
};