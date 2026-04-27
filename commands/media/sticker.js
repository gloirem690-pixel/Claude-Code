// commands/media/sticker.js
import { downloadMediaMessage } from 'baileys';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import fs from 'fs';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';

export default {
  name: 'sticker',
  description: 'Convertir une image ou vidéo en sticker',
  cooldown: 5,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) return sock.sendMessage(remoteJid, { text: '❌ Réponds à une image ou vidéo.' });
    const isVideo = !!quoted.videoMessage;
    const isImage = !!quoted.imageMessage;
    if (!isVideo && !isImage) return sock.sendMessage(remoteJid, { text: '❌ Média non supporté.' });

    const buffer = await downloadMediaMessage({ message: quoted }, 'buffer');
    const uniqueId = Date.now();
    const tempInput = `./temp_${uniqueId}.${isVideo ? 'mp4' : 'jpg'}`;
    const tempOutput = `./temp_sticker_${uniqueId}.webp`;
    fs.writeFileSync(tempInput, buffer);

    if (isVideo) {
      await new Promise((resolve, reject) => {
        ffmpeg(tempInput)
          .output(tempOutput)
          .outputOptions(['-vf scale=512:512:flags=lanczos', '-c:v libwebp', '-q:v 50', '-preset default', '-loop 0', '-an', '-vsync 0'])
          .on('end', resolve)
          .on('error', reject)
          .run();
      });
    } else {
      await sharp(tempInput).resize(512, 512, { fit: 'inside' }).webp({ quality: 80 }).toFile(tempOutput);
    }

    const sticker = new Sticker(tempOutput, {
      pack: msg.pushName || 'CyberSec',
      author: msg.pushName || 'Crew',
      type: isVideo ? StickerTypes.FULL : StickerTypes.DEFAULT,
      quality: 80,
      animated: isVideo,
    });
    await sock.sendMessage(remoteJid, await sticker.toMessage());
    fs.unlinkSync(tempInput);
    fs.unlinkSync(tempOutput);
  }
};