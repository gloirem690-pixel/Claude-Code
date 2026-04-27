// commands/owner/delsudo.js
import configmanager from '../../utils/configmanager.js';

export default {
  name: 'delsudo',
  description: 'Retirer un utilisateur de la sudoList',
  adminOnly: true,
  cooldown: 10,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const number = sock.user.id.split(':')[0];
    let participant;

    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      participant = msg.message.extendedTextMessage.contextInfo.participant;
    } else if (args[0]) {
      participant = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
      return sock.sendMessage(remoteJid, { text: '❌ Mentionnez un utilisateur.' });
    }

    const index = configmanager.config.users[number].sudoList.indexOf(participant);
    if (index !== -1) {
      configmanager.config.users[number].sudoList.splice(index, 1);
      configmanager.save();
      await sock.sendMessage(remoteJid, { text: `🚫 ${participant} retiré de la sudoList.` });
    } else {
      await sock.sendMessage(remoteJid, { text: `ℹ️ ${participant} n’est pas sudo.` });
    }
  }
};