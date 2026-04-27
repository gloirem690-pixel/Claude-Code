import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export default {
  name: 'setpp',
  description: 'Changer la photo de profil du bot',
  cooldown: 30,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted && !msg.message?.imageMessage) return sock.sendMessage(remoteJid, { text: '📸 Réponds à une image.' });
    const media = quoted || msg;
    const imageBuffer = await sock.downloadMediaMessage(media);
    if (!imageBuffer) return sock.sendMessage(remoteJid, { text: '❌ Impossible de télécharger.' });
    const tempPath = join(tmpdir(), `pp_${Date.now()}.jpg`);
    writeFileSync(tempPath, imageBuffer);
    await sock.updateProfilePicture(sock.user.id, { url: tempPath });
    unlinkSync(tempPath);
    sock.sendMessage(remoteJid, { text: '✅ Photo changée' });
  }
};