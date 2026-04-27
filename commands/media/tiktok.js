// commands/media/tiktok.js
import axios from 'axios';
import stylizedChar from '../../utils/fancy.js';

export default {
  name: 'tiktok',
  description: 'Télécharger une vidéo TikTok sans watermark',
  cooldown: 15,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const url = args[0];
    if (!url || !url.includes('tiktok.com')) return sock.sendMessage(remoteJid, { text: stylizedChar('⚠️ Fournis un lien TikTok valide.') });
    await sock.sendMessage(remoteJid, { text: stylizedChar('🚀 Téléchargement en cours...') });
    try {
      const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${url}`;
      const { data } = await axios.get(apiUrl);
      if (!data.status || !data.data) throw new Error('Échec de l’API');
      const { title, like, comment, share, author, meta } = data.data;
      const videoUrl = meta.media.find(v => v.type === 'video')?.org;
      if (!videoUrl) throw new Error('Lien vidéo introuvable');
      const caption = stylizedChar(`🎬 TikTok\n👤 ${author.nickname}\n❤️ ${like}\n💬 ${comment}\n🔗 ${share}`);
      await sock.sendMessage(remoteJid, { video: { url: videoUrl }, caption });
    } catch (e) {
      console.error(e);
      sock.sendMessage(remoteJid, { text: stylizedChar('❌ Erreur de téléchargement TikTok.') });
    }
  }
};