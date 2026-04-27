// commands/admin/autoreact.js
import configmanager from '../../utils/configmanager.js';
import bug from '../../utils/bug.js';

export default {
  name: 'autoreact',
  description: 'Activer/désactiver l’auto‑réaction du bot',
  adminOnly: true,
  cooldown: 5,
  async execute(sock, msg, args) {
    const number = sock.user.id.split(':')[0];
    const remoteJid = msg.key.remoteJid;
    if (!args[0]) return sock.sendMessage(remoteJid, { text: "Utilisation: .autoreact on/off" });
    const input = args[0].toLowerCase();
    if (!configmanager.config.users[number]) configmanager.config.users[number] = {};
    const userConfig = configmanager.config.users[number];
    if (input === 'on') {
      userConfig.autoreact = true;
      configmanager.save();
      await bug(msg, sock, 'Auto‑react activé.', 3);
    } else if (input === 'off') {
      userConfig.autoreact = false;
      configmanager.save();
      await bug(msg, sock, 'Auto‑react désactivé.', 3);
    } else {
      sock.sendMessage(remoteJid, { text: "Choisissez on/off" });
    }
  }
};