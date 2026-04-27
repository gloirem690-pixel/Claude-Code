// utils/bug.js
export default async function bug(msg, sock, texts, num) {
  try {
    const remoteJid = msg.key?.remoteJid;
    await sock.sendMessage(remoteJid, {
      image: { url: `database/${num}.jpg` },
      caption: `> ${texts}`,
      contextInfo: {
        externalAdReply: {
          title: "Join Our WhatsApp Channel",
          body: " Digix Crew ",
          mediaType: 1,
          thumbnailUrl: "https://whatsapp.com/channel/0029VbBT7FdLCoX1TDyQQb1B",
          renderLargerThumbnail: false,
          mediaUrl: `${num}.jpg`,
          sourceUrl: `${num}.jpg`
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
}