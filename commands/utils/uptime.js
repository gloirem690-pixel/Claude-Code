// commands/utils/uptime.js
export default {
  name: 'uptime',
  description: 'Affiche le temps de fonctionnement du bot',
  cooldown: 10,
  async execute(sock, msg, args) {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
    const text = `┌─🤖 CyberSec Crew ─┐\n│ ⏱️ Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s\n│ 💾 RAM: ${usedRam} MB\n│ "Beyond limits, we rise."\n└────────────────────┘`;
    await sock.sendMessage(msg.key.remoteJid, { text });
  }
};