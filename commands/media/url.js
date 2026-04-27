// commands/media/url.js
import axios from 'axios';
import { downloadMediaMessage } from 'baileys';
import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';

async function uploadToCatbox(buffer, fileName) {
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', buffer, fileName);
  const res = await axios.post('https://catbox.moe/user/api.php', form, { headers: form.getHeaders() });
  return res.data.trim();
}

export default {
  name: 'url',
  description: 'Héberger un fichier (image, vidéo, audio, document) sur Catbox',
  cooldown: 10,
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    if (!ctx?.quotedMessage) return sock.sendMessage(jid, { text: 'Réponds à un média (image, vidéo, audio, document).' });

    let mediaMessage = null;
    let ext = 'bin';
    if (ctx.quotedMessage.imageMessage) {
      mediaMessage = { imageMessage: ctx.quotedMessage.imageMessage };
      ext = 'jpg';
    } else if (ctx.quotedMessage.videoMessage) {
      mediaMessage = { videoMessage: ctx.quotedMessage.videoMessage };
      ext = 'mp4';
    } else if (ctx.quotedMessage.audioMessage) {
      mediaMessage = { audioMessage: ctx.quotedMessage.audioMessage };
      ext = 'mp3';
    } else if (ctx.quotedMessage.documentMessage) {
      mediaMessage = { documentMessage: ctx.quotedMessage.documentMessage };
      ext = ctx.quotedMessage.documentMessage.fileName?.split('.').pop() || 'bin';
    } else {
      return sock.sendMessage(jid, { text: 'Type de média non supporté.' });
    }

    await sock.sendMessage(jid, { text: '☁️ Upload en cours...' });
    const buffer = await downloadMediaMessage(
      { key: { remoteJid: jid, id: ctx.stanzaId, fromMe: false }, message: mediaMessage },
      'buffer'
    );
    const type = await fileTypeFromBuffer(buffer);
    if (type?.ext) ext = type.ext;
    const link = await uploadToCatbox(buffer, `file_${Date.now()}.${ext}`);
    await sock.sendMessage(jid, { text: `✅ Fichier hébergé :\n${link}` });
  }
};