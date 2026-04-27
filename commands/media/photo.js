import { downloadMediaMessage } from 'baileys';
import fs from 'fs';

export default {
  name: 'photo',
  description: 'Convertir un sticker en image',
  cooldown: 5,
  async execute(sock, msg, args) {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const target = quoted?.stickerMessage;
    if (!target) return sock.sendMessage(msg.key.remoteJid, { text: '📸 Répondez à un sticker.' });
    const buffer = await downloadMediaMessage({ message: quoted }, 'buffer');
    const filename = `./temp/sticker-${Date.now()}.png`;
    if (!fs.existsSync('./temp')) fs.mkdirSync('./temp');
    fs.writeFileSync(filename, buffer);
    await sock.sendMessage(msg.key.remoteJid, { image: fs.readFileSync(filename), caption: '✨ CyberSec Crew' });
    fs.unlinkSync(filename);
  }
};