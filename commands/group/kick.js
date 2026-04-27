// commands/group/kick.js
export default {
  name: 'kick',
  description: 'Expulser un membre du groupe',
  cooldown: 5,
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Cette commande n\'est utilisable que dans un groupe.' });
    let target;
    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      target = msg.message.extendedTextMessage.contextInfo.participant;
    } else if (args[0]) {
      target = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
      return sock.sendMessage(groupId, { text: '❌ Répondez au message d\'un utilisateur ou mentionnez-le.' });
    }
    try {
      await sock.groupParticipantsUpdate(groupId, [target], 'remove');
      await sock.sendMessage(groupId, { text: `🚫 @${target.split('@')[0]} a été expulsé.`, mentions: [target] });
    } catch (error) {
      console.error(error);
      sock.sendMessage(groupId, { text: '❌ Impossible d\'expulser (vérifiez que le bot est admin).' });
    }
  }
};