// commands/group/promote.js
export default {
  name: 'promote',
  description: 'Promouvoir un membre en admin',
  cooldown: 5,
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Groupe uniquement.' });
    let target;
    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      target = msg.message.extendedTextMessage.contextInfo.participant;
    } else if (args[0]) {
      target = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
      return sock.sendMessage(groupId, { text: '❌ Répondez à un message ou mentionnez.' });
    }
    try {
      await sock.groupParticipantsUpdate(groupId, [target], 'promote');
      await sock.sendMessage(groupId, { text: `👑 @${target.split('@')[0]} est maintenant admin.`, mentions: [target] });
    } catch (error) {
      sock.sendMessage(groupId, { text: '❌ Échec de la promotion.' });
    }
  }
};