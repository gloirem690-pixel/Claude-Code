// commands/admin/public.js
import configmanager from '../../utils/configmanager.js';

export default {
  name: 'public',
  description: 'Activer/désactiver le mode public (accès à tous)',
  adminOnly: true,
  cooldown: 5,
  async execute(sock, msg, args) {
    const number = sock.user.id.split(':')[0];
    const remoteJid = msg.key.remoteJid;
    const state = args[0]?.toLowerCase();
    if (!state || (state !== 'on' && state !== 'off')) {
      return sock.sendMessage(remoteJid, { text: 'Utilisation: .public on/off' });
    }
    if (!configmanager.config.users[number]) configmanager.config.users[number] = {};
    configmanager.config.users[number].publicMode = (state === 'on');
    configmanager.save();
    await sock.sendMessage(remoteJid, { text: `Mode public ${state === 'on' ? 'activé' : 'désactivé'}` });
  }
};