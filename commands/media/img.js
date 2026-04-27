// commands/media/img.js
import axios from 'axios';

export default {
  name: 'img',
  description: 'Recherche d\'images via Pinterest',
  cooldown: 10,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const query = args.join(' ');
    if (!query) return sock.sendMessage(remoteJid, { text: "🖼️ Fournis des mots-clés\nExemple: .img hacker setup" });
    await sock.sendMessage(remoteJid, { text: `🔍 Recherche d'images pour "${query}"...` });
    try {
      const apiUrl = `https://christus-api.vercel.app/image/Pinterest?query=${encodeURIComponent(query)}&limit=10`;
      const response = await axios.get(apiUrl, { timeout: 15000 });
      if (!response.data?.status || !Array.isArray(response.data.results) || response.data.results.length === 0) {
        return sock.sendMessage(remoteJid, { text: "❌ Aucune image trouvée." });
      }
      const images = response.data.results.filter(item => item.imageUrl && /\.(jpg|jpeg|png|webp)$/i.test(item.imageUrl)).slice(0, 5);
      if (images.length === 0) return sock.sendMessage(remoteJid, { text: "❌ Aucune image valide trouvée." });
      for (const image of images) {
        await sock.sendMessage(remoteJid, { image: { url: image.imageUrl }, caption: `📷 ${query}\n© CyberSec Crew` });
        await new Promise(r => setTimeout(r, 1000));
      }
    } catch (error) {
      console.error("IMG ERROR:", error.message);
      sock.sendMessage(remoteJid, { text: "❌ Erreur API Pinterest." });
    }
  }
};