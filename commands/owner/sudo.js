// commands/owner/sudo.js
import configmanager from '../../utils/configmanager.js';

export default {
  name: 'sudo',
  description: 'Ajouter un utilisateur à la sudoList',
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
      return sock.sendMessage(remoteJid, { text: '❌ Mentionnez un utilisateur ou répondez à son message.' });
    }

    if (!configmanager.config.users[number].sudoList.includes(participant)) {
      configmanager.config.users[number].sudoList.push(participant);
      configmanager.save();
      await sock.sendMessage(remoteJid, { text: `✅ ${participant} ajouté à la sudoList.` });
    } else {
      await sock.sendMessage(remoteJid, { text: `⚠️ ${participant} est déjà sudo.` });
    }
  }
};