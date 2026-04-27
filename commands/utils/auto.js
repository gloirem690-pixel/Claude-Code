// utils/auto.js
import configmanager from './configmanager.js'; // à adapter

export async function autorecord(sock, msg) {
  try {
    const remoteJid = msg.key.remoteJid;
    const number = sock.user.id.split(':')[0];
    if (!configmanager.config.users[number]?.record) return;
    await sock.sendPresenceUpdate('recording', remoteJid);
    setTimeout(async () => {
      await sock.sendPresenceUpdate('available', remoteJid);
    }, 3000);
  } catch (error) {
    console.error('Autorecord error:', error);
  }
}

export async function autotype(sock, msg) {
  try {
    const remoteJid = msg.key.remoteJid;
    const number = sock.user.id.split(':')[0];
    if (!configmanager.config.users[number]?.type) return;
    await sock.sendPresenceUpdate('composing', remoteJid);
    setTimeout(async () => {
      await sock.sendPresenceUpdate('available', remoteJid);
    }, 3000);
  } catch (error) {
    console.error('Autotype error:', error);
  }
}