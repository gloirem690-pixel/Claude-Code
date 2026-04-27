// commands/admin/setautorecord.js
import configmanager from '../../utils/configmanager.js';
import bug from '../../utils/bug.js';

export default {
  name: 'setautorecord',
  description: 'Activer/désactiver l’enregistrement automatique (autorecord)',
  adminOnly: true,
  cooldown: 5,
  async execute(sock, msg, args) {
    const number = sock.user.id.split(':')[0];
    const remoteJid = msg.key.remoteJid;
    const state = args[0]?.toLowerCase();
    if (!state || (state !== 'on' && state !== 'off')) {
      return sock.sendMessage(remoteJid, { text: 'Utilisation: .setautorecord on/off' });
    }
    if (!configmanager.config.users[number]) configmanager.config.users[number] = {};
    configmanager.config.users[number].record = (state === 'on');
    configmanager.save();
    await bug(msg, sock, `Auto‑record ${state === 'on' ? 'activé' : 'désactivé'}`, 3);
  }
};