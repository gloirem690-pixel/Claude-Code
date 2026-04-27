// utils/sender.js
import stylizedChar from './fancy.js';

export default async function sender(msg, sock, texts) {
  const remoteJid = msg?.key?.remoteJid;
  try {
    await sock.sendMessage(remoteJid, { text: stylizedChar(`> _*${texts}*_`) });
  } catch (e) {
    console.log('Erreur sender :', e);
  }
}