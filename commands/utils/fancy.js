// commands/utils/fancy.js
const cursiveMap = {
  a: 'рқ’¶', b: 'рқ’·', c: 'рқ’ё', d: 'рқ’№', e: 'рқ‘’', f: 'рқ’»', g: 'рқ‘”', h: 'рқ’Ҫ', i: 'рқ’ҫ', j: 'рқ’ҝ', k: 'рқ“Җ',
  l: 'рқ“Ғ', m: 'рқ“Ӯ', n: 'рқ“ғ', o: 'рқ‘ң', p: 'рқ“…', q: 'рқ“Ҷ', r: 'рқ“Ү', s: 'рқ“Ҳ', t: 'рқ“ү', u: 'рқ“Ҡ',
  v: 'рқ“Ӣ', w: 'рқ“Ң', x: 'рқ“Қ', y: 'рқ“Һ', z: 'рқ“Ҹ',
  A: 'рқ’ң', B: 'рқҗө', C: 'рқ’һ', D: 'рқ’ҹ', E: 'рқҗё', F: 'рқҗ№', G: 'рқ’ў', H: 'рқҗ»', I: 'рқҗј', J: 'рқ’ҥ',
  K: 'рқ’Ұ', L: 'рқҗҝ', M: 'рқ‘Җ', N: 'рқ’©', O: 'рқ’Ә', P: 'рқ’«', Q: 'рқ’¬', R: 'рқ‘…', S: 'рқ’®', T: 'рқ’Ҝ',
  U: 'рқ’°', V: 'рқ’ұ', W: 'рқ’І', X: 'рқ’і', Y: 'рқ’ҙ', Z: 'рқ’ө'
};

const boldMap = {
  a: 'рқҗҡ', b: 'рқҗӣ', c: 'рқҗң', d: 'рқҗқ', e: 'рқҗһ', f: 'рқҗҹ', g: 'рқҗ ', h: 'рқҗЎ', i: 'рқҗў', j: 'рқҗЈ',
  k: 'рқҗӨ', l: 'рқҗҘ', m: 'рқҗҰ', n: 'рқҗ§', o: 'рқҗЁ', p: 'рқҗ©', q: 'рқҗӘ', r: 'рқҗ«', s: 'рқҗ¬', t: 'рқҗӯ',
  u: 'рқҗ®', v: 'рқҗҜ', w: 'рқҗ°', x: 'рқҗұ', y: 'рқҗІ', z: 'рқҗі',
  A: 'рқҗҖ', B: 'рқҗҒ', C: 'рқҗӮ', D: 'рқҗғ', E: 'рқҗ„', F: 'рқҗ…', G: 'рқҗҶ', H: 'рқҗҮ', I: 'рқҗҲ', J: 'рқҗү',
  K: 'рқҗҠ', L: 'рқҗӢ', M: 'рқҗҢ', N: 'рқҗҚ', O: 'рқҗҺ', P: 'рқҗҸ', Q: 'рқҗҗ', R: 'рқҗ‘', S: 'рқҗ’', T: 'рқҗ“',
  U: 'рқҗ”', V: 'рқҗ•', W: 'рқҗ–', X: 'рқҗ—', Y: 'рқҗҳ', Z: 'рқҗҷ'
};

const italicMap = {
  a: 'рқҳў', b: 'рқҳЈ', c: 'рқҳӨ', d: 'рқҳҘ', e: 'рқҳҰ', f: 'рқҳ§', g: 'рқҳЁ', h: 'рқҳ©', i: 'рқҳӘ', j: 'рқҳ«',
  k: 'рқҳ¬', l: 'рқҳӯ', m: 'рқҳ®', n: 'рқҳҜ', o: 'рқҳ°', p: 'рқҳұ', q: 'рқҳІ', r: 'рқҳі', s: 'рқҳҙ', t: 'рқҳө',
  u: 'рқҳ¶', v: 'рқҳ·', w: 'рқҳё', x: 'рқҳ№', y: 'рқҳә', z: 'рқҳ»',
  A: 'рқҳҲ', B: 'рқҳү', C: 'рқҳҠ', D: 'рқҳӢ', E: 'рқҳҢ', F: 'рқҳҚ', G: 'рқҳҺ', H: 'рқҳҸ', I: 'рқҳҗ', J: 'рқҳ‘',
  K: 'рқҳ’', L: 'рқҳ“', M: 'рқҳ”', N: 'рқҳ•', O: 'рқҳ–', P: 'рқҳ—', Q: 'рқҳҳ', R: 'рқҳҷ', S: 'рқҳҡ', T: 'рқҳӣ',
  U: 'рқҳң', V: 'рқҳқ', W: 'рқҳһ', X: 'рқҳҹ', Y: 'рқҳ ', Z: 'рқҳЎ'
};

const boldItalicMap = {
  a: 'рқҷ–', b: 'рқҷ—', c: 'рқҷҳ', d: 'рқҷҷ', e: 'рқҷҡ', f: 'рқҷӣ', g: 'рқҷң', h: 'рқҷқ', i: 'рқҷһ', j: 'рқҷҹ',
  k: 'рқҷ ', l: 'рқҷЎ', m: 'рқҷў', n: 'рқҷЈ', o: 'рқҷӨ', p: 'рқҷҘ', q: 'рқҷҰ', r: 'рқҷ§', s: 'рқҷЁ', t: 'рқҷ©',
  u: 'рқҷӘ', v: 'рқҷ«', w: 'рқҷ¬', x: 'рқҷӯ', y: 'рқҷ®', z: 'рқҷҜ',
  A: 'рқҳј', B: 'рқҳҪ', C: 'рқҳҫ', D: 'рқҳҝ', E: 'рқҷҖ', F: 'рқҷҒ', G: 'рқҷӮ', H: 'рқҷғ', I: 'рқҷ„', J: 'рқҷ…',
  K: 'рқҷҶ', L: 'рқҷҮ', M: 'рқҷҲ', N: 'рқҷү', O: 'рқҷҠ', P: 'рқҷӢ', Q: 'рқҷҢ', R: 'рқҷҚ', S: 'рқҷҺ', T: 'рқҷҸ',
  U: 'рқҷҗ', V: 'рқҷ‘', W: 'рқҷ’', X: 'рқҷ“', Y: 'рқҷ”', Z: 'рқҷ•'
};

const squaredMap = {
  A: 'рҹ„°', B: 'рҹ„ұ', C: 'рҹ„І', D: 'рҹ„і', E: 'рҹ„ҙ', F: 'рҹ„ө', G: 'рҹ„¶', H: 'рҹ„·', I: 'рҹ„ё', J: 'рҹ„№',
  K: 'рҹ„ә', L: 'рҹ„»', M: 'рҹ„ј', N: 'рҹ„Ҫ', O: 'рҹ„ҫ', P: 'рҹ„ҝ', Q: 'рҹ…Җ', R: 'рҹ…Ғ', S: 'рҹ…Ӯ', T: 'рҹ…ғ',
  U: 'рҹ…„', V: 'рҹ……', W: 'рҹ…Ҷ', X: 'рҹ…Ү', Y: 'рҹ…Ҳ', Z: 'рҹ…ү'
};

const classicFonts = [
  (t) => t,                               // 1. Normal
  (t) => t.toUpperCase(),                 // 2. UPPERCASE
  (t) => t.toLowerCase(),                 // 3. lowercase
  (t) => [...t].map(c => cursiveMap[c] || c).join(''),   // 4. Cursive
  (t) => [...t].map(c => boldMap[c] || c).join(''),      // 5. Bold
  (t) => [...t].map(c => italicMap[c] || c).join(''),    // 6. Italic
  (t) => [...t].map(c => boldItalicMap[c] || c).join(''),// 7. Bold Italic
  (t) => `\`\`\`${t}\`\`\``,                            // 8. Monospace
  (t) => [...t].map(c => 'в“җв“‘в“’в““в“”в“•в“–в“—в“ҳв“ҷв“ҡв“ӣв“ңв“қв“һв“ҹв“ в“Ўв“ўв“Јв“Өв“Ҙв“Ұв“§в“Ёв“©'['abcdefghijklmnopqrstuvwxyz'.indexOf(c.toLowerCase())] || c).join(''), // 9. Circled
  (t) => [...t].map(c => squaredMap[c.toUpperCase()] || c).join(''), // 10. Squared
  (t) => [...t].map(c => `(${c})`).join(''),            // 11. Bracketed
  (t) => [...t].map(c => `к“ҜBCDЖҺкһ’Ж‘Ж“HIЕҝкһ°кһӯкһӨOкһ®кһ°кһ°кһ°кһ°кһ°кһ°кһ°кһ°кһ°`['ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c.toUpperCase())] || c).join(''), // 12. Weird caps
  (t) => [...t].map(c => c + 'НӨ').join(''),            // 13. Ghost text
  (t) => t.split('').join(' '),                        // 14. Spaced
  (t) => t.split('').map(c => c + 'НңНЎ').join(''),    // 15. Hacker style
  (t) => `ајҺ${t}ајҺ`,                                 // 16. Double brackets
  (t) => `гҖҢ${t}гҖҚ`,                                 // 17. Japanese-style quote
  (t) => `гҖҺвҳ…${t}вҳ…гҖҸ`,                         // 18. Star-bracket
  (t) => `вҹҰ${t}вҹ§`,                                 // 19. Math brackets
  (t) => `*${t}*`,                                    // 20. Classic bold marker
];

const decorativeFonts = [
  (t) => `вңЁ ${t} вңЁ`,                               // 21.
  (t) => `рҹ”Ҙ ${t.toUpperCase()} рҹ”ҥ`,             // 22.
  (t) => [...t].map(c => `рҹ’Ҁ${c}`).join(''),        // 23.
  (t) => `ај’ ${t} ај’`,                              // 24.
  (t) => `ајј ${t} ајҪ`,                              // 25.
  (t) => `вҳ…еҪЎ ${t} еҪЎвҳ…`,                       // 26.
  (t) => `бҒҌ${t.toUpperCase()}бҒҌ`,                 // 27.
  (t) => `рҹҺҖ ${t} рҹҺҖ`,                           // 28.
  (t) => `рҹ‘‘${t}рҹ‘‘`,                             // 29.
  (t) => `вң§пҪҘпҫҹ: *вң§пҪҘпҫҹ:* ${t} *:пҪҘпҫҹвң§*:пҪҘпҫҹвң§`, // 30.
];

const fancyFonts = [...classicFonts, ...decorativeFonts];

export default {
  name: 'fancy',
  description: 'Stylise un texte',
  cooldown: 5,
  async execute(sock, msg, args) {
    const remoteJid = msg.key.remoteJid;
    // Récupérer le texte complet du message (sans le préfixe ni la commande)
    const fullText = msg.message?.extendedTextMessage?.text || msg.message?.conversation || '';
    const parts = fullText.trim().split(' ');
    const cmdArgs = parts.slice(1).filter(p => p.trim() !== '');
    if (cmdArgs.length === 0 || isNaN(parseInt(cmdArgs[0]))) {
      const sampleText = "Fancy Text";
      const preview = fancyFonts.map((f, i) => `*${i + 1}.* ${f(sampleText)}`).join('\n\n');
      return await sock.sendMessage(remoteJid, { text: preview });
    }
    const styleIndex = parseInt(cmdArgs[0]) - 1;
    const content = cmdArgs.slice(1).join(' ');
    if (styleIndex < 0 || styleIndex >= fancyFonts.length) {
      return await sock.sendMessage(remoteJid, { text: "❌ Invalid style number. Use *.fancy* to view styles." });
    }
    if (!content.trim()) {
      return await sock.sendMessage(remoteJid, { text: "⚠️ Please provide text to style.\nExample: *.fancy 3 Hello World!*" });
    }
    const styled = fancyFonts[styleIndex](content);
    await sock.sendMessage(remoteJid, { text: styled });
  }
};