import axios from 'axios';
import stylizedChar from '../../utils/fancy.js';

export default {
  name: 'play',
  description: 'Télécharger une musique depuis YouTube',
  cooldown: 15,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const query = args.join(' ');
    if (!query) return sock.sendMessage(remoteJid, { text: stylizedChar('❌ Fournis un titre.') });
    await sock.sendMessage(remoteJid, { text: stylizedChar(`🔎 Recherche : ${query}`) });
    try {
      const searchUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(query)}`;
      const { data } = await axios.get(searchUrl, { timeout: 10000 });
      if (!data.status || !data.result) throw new Error('Vidéo non trouvée.');
      const videoData = data.result;
      const videoUrl = videoData.url || videoData.download_url;
      if (!videoUrl) throw new Error('URL non disponible.');
      const apiUrl = `https://youtubeabdlpro.abrahamdw882.workers.dev/?url=${encodeURIComponent(videoUrl)}`;
      await sock.sendMessage(remoteJid, { image: { url: videoData.thumbnail }, caption: `🎵 *${videoData.title}*\n⏱️ ${videoData.duration || 'Inconnu'}\n👁️ ${videoData.views || 'Inconnu'} vues` });
      await sock.sendMessage(remoteJid, { audio: { url: apiUrl }, mimetype: 'audio/mp4', ptt: false });
    } catch (error) {
      console.error('Play error:', error.message);
      sock.sendMessage(remoteJid, { text: stylizedChar('❌ Erreur de téléchargement.') });
    }
  }
};