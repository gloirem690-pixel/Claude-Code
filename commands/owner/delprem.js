// commands/owner/delprem.js
import configmanager from '../../utils/configmanager.js';

export default {
  name: 'delprem',
  description: 'Retirer un utilisateur premium',
  adminOnly: true,
  cooldown: 10,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    let participant;

    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      participant = msg.message.extendedTextMessage.contextInfo.participant;
    } else if (args[0]) {
      participant = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
      return sock.sendMessage(remoteJid, { text: '❌ Mentionnez un utilisateur ou répondez à son message.' });
    }

    const number = participant.split('@')[0];

    try {
      if (!configmanager.premiums.premiumUser) {
        configmanager.premiums.premiumUser = {};
      }

      const key = `p_${number}`;
      if (configmanager.premiums.premiumUser[key]) {
        delete configmanager.premiums.premiumUser[key];
        configmanager.saveP();
        await sock.sendMessage(remoteJid, { text: `🚫 ${participant} n'est plus premium.` });
      } else {
        await sock.sendMessage(remoteJid, { text: `ℹ️ ${participant} n'est pas premium.` });
      }
    } catch (error) {
      console.error('delprem error:', error);
      sock.sendMessage(remoteJid, { text: `❌ Erreur : ${error.message}` });
    }
  }
};