// commands/media/save.js
import { downloadMediaMessage } from 'baileys';
import fs from 'fs';
import path from 'path';

// Fonction utilitaire pour désactiver viewOnce dans l’objet
function modifyViewOnce(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  for (const key in obj) {
    if (key === 'viewOnce' && typeof obj[key] === 'boolean') {
      obj[key] = false;
    } else if (typeof obj[key] === 'object') {
      modifyViewOnce(obj[key]);
    }
  }
}

export default {
  name: 'save',
  aliases: ['vv'],
  description: 'Sauvegarder un message ViewOnce (image/vidéo/audio)',
  cooldown: 5,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted?.imageMessage?.viewOnce && !quoted?.videoMessage?.viewOnce && !quoted?.audioMessage?.viewOnce) {
      return sock.sendMessage(remoteJid, { text: '_Réponds à un message ViewOnce._' });
    }

    // Clone l’objet pour éviter de modifier l’original
    const content = JSON.parse(JSON.stringify(quoted));
    modifyViewOnce(content);

    let mediaBuffer = null;
    let fileExt = '';
    let mediaType = '';

    if (content.imageMessage) {
      mediaBuffer = await downloadMediaMessage({ message: { imageMessage: content.imageMessage } }, 'buffer');
      fileExt = 'jpg';
      mediaType = 'image';
    } else if (content.videoMessage) {
      mediaBuffer = await downloadMediaMessage({ message: { videoMessage: content.videoMessage } }, 'buffer');
      fileExt = 'mp4';
      mediaType = 'video';
    } else if (content.audioMessage) {
      mediaBuffer = await downloadMediaMessage({ message: { audioMessage: content.audioMessage } }, 'buffer');
      fileExt = 'mp3';
      mediaType = 'audio';
    }

    if (!mediaBuffer) {
      return sock.sendMessage(remoteJid, { text: '_Impossible de télécharger le média._' });
    }

    const tempPath = path.resolve(`./temp_viewonce_${Date.now()}.${fileExt}`);
    fs.writeFileSync(tempPath, mediaBuffer);

    await sock.sendMessage(remoteJid, {
      [mediaType]: { url: tempPath },
      caption: mediaType === 'image' ? '✅ ViewOnce sauvegardé' : undefined
    });

    fs.unlinkSync(tempPath);
  }
};