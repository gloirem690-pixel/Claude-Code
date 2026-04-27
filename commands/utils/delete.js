// commands/utils/delete.js
import sender from '../../utils/sender.js'; // adapte

export default {
  name: 'dlt',
  aliases: ['delete'],
  description: 'Supprimer un message cité',
  cooldown: 5,
  async execute(sock, msg, args) {
    const quotedMessageInfo = msg.message?.extendedTextMessage?.contextInfo;
    if (!quotedMessageInfo?.quotedMessage) {
      return sender(msg, sock, "❌ Please reply to a message to delete it.");
    }
    const chatId = msg.key.remoteJid;
    const quotedMessageKey = quotedMessageInfo.stanzaId;
    const quotedSender = quotedMessageInfo.participant;
    const isFromBot = quotedSender === sock.user.id;
    if (!quotedMessageKey || !chatId) {
      return sender(msg, sock, "❌ Could not find the message to delete.");
    }
    try {
      await sock.sendMessage(chatId, { delete: quotedMessageKey });
    } catch (error) {
      try {
        await sock.chatModify(
          { clear: { messages: [{ id: quotedMessageKey, fromMe: isFromBot }] } },
          chatId
        );
      } catch (err) {
        sender(msg, sock, "❌ Unable to delete the message.");
      }
    }
  }
};