// commands/utils/menu.js
import fs from 'fs';
import path from 'path';
import settings from '../../config/settings.js';
import stylizedChar from '../../utils/fancy.js';

function getCategoryIcon(category) {
  const c = category.toLowerCase();
  if (c === 'utils') return '⚙️';
  if (c === 'media') return '📸';
  if (c === 'group') return '👥';
  if (c === 'bug') return '🐞';
  if (c === 'ai') return '🧠';
  if (c === 'admin') return '👑';
  if (c === 'premium') return '💎';
  return '🎯';
}

export default {
  name: 'menu',
  description: 'Affiche le menu des commandes',
  cooldown: 5,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    const userName = msg.pushName || 'Invité';
    const prefix = settings.prefix;

    // Parcours récursif du dossier commands
    const categories = {};
    function walk(dir, parentCat = '') {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          walk(full, file);
        } else if (file.endsWith('.js') && file !== '_template.js') {
          let cat = path.basename(path.dirname(full));
          if (cat === 'commands') cat = 'utils';
          if (!categories[cat]) categories[cat] = [];
          categories[cat].push(file.replace('.js', ''));
        }
      }
    }
    walk('./commands');

    let menu = `*${settings.botName}* - Menu\nPrefix: ${prefix}\nUtilisateur: ${stylizedChar(userName)}\n\n`;
    for (const [cat, cmds] of Object.entries(categories)) {
      const icon = getCategoryIcon(cat);
      menu += `${icon} *${cat.toUpperCase()}*\n`;
      cmds.forEach(c => { menu += `  ◈ .${c}\n`; });
      menu += '\n';
    }
    await sock.sendMessage(remoteJid, { text: menu });
  }
};