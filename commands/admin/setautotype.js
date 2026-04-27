// commands/admin/setautotype.js
import configmanager from '../../utils/configmanager.js';
import bug from '../../utils/bug.js';

export default {
  name: 'setautotype',
  description: 'Activer/désactiver l’indicateur de frappe automatique',
  adminOnly: true,
  cooldown: 5,
  async execute(sock, msg, args) {
    const number = sock.user.id.split(':')[0];
    const remoteJid = msg.key.remoteJid;
    const state = args[0]?.toLowerCase();
    if (!state || (state !== 'on' && state !== 'off')) {
      return sock.sendMessage(remoteJid, { text: 'Utilisation: .setautotype on/off' });
    }
    if (!configmanager.config.users[number]) configmanager.config.users[number] = {};
    configmanager.config.users[number].type = (state === 'on');
    configmanager.save();
    await bug(msg, sock, `Auto‑type ${state === 'on' ? 'activé' : 'désactivé'}`, 3);
  }
};