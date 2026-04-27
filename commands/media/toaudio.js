import { downloadMediaMessage } from 'baileys';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

export default {
  name: 'toaudio',
  aliases: ['tomp3'],
  description: 'Extraire l\'audio d\'une vidéo',
  cooldown: 10,
  async execute(sock, msg, args) {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const target = quoted?.videoMessage;
    if (!target) return sock.sendMessage(msg.key.remoteJid, { text: '🎵 Répondez à une vidéo.' });
    const buffer = await downloadMediaMessage({ message: quoted }, 'buffer');
    const inputPath = `./temp/video-${Date.now()}.mp4`;
    const outputPath = `./temp/audio-${Date.now()}.mp3`;
    if (!fs.existsSync('./temp')) fs.mkdirSync('./temp');
    fs.writeFileSync(inputPath, buffer);
    await execPromise(`ffmpeg -i ${inputPath} -vn -ab 128k -ar 44100 -y ${outputPath}`);
    await sock.sendMessage(msg.key.remoteJid, { audio: fs.readFileSync(outputPath), mimetype: 'audio/mp4', ptt: false });
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  }
};