// commands/media/take.js
import { downloadMediaMessage } from 'baileys';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import fs from 'fs';

export default {
  name: 'take',
  description: 'Modifier le texte (pack/author) d’un sticker',
  cooldown: 5,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted?.stickerMessage) return sock.sendMessage(remoteJid, { text: '❌ Réponds à un sticker.' });
    const text = args.join(' ') || msg.pushName || 'CyberSec';
    const buffer = await downloadMediaMessage({ message: quoted }, 'buffer');
    const tempPath = './temp_sticker.webp';
    fs.writeFileSync(tempPath, buffer);

    const sticker = new Sticker(tempPath, {
      pack: text,
      author: text,
      type: StickerTypes.FULL,
      quality: 50,
    });
    await sock.sendMessage(remoteJid, await sticker.toMessage());
    fs.unlinkSync(tempPath);
  }
};