// utils/rankManager.js
import Database from 'better-sqlite3';
const db = new Database('database/db.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    totalMessages INTEGER DEFAULT 0,
    lastMessage INTEGER DEFAULT 0
  )
`);

export function xpNeededForLevel(level) {
  return Math.floor(100 * level * 1.5);
}

export function addXP(userId, name, amount, sock, remoteJid) {
  let user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  let xp = (user?.xp || 0) + amount;
  let level = user?.level || 1;
  let total = (user?.totalMessages || 0) + 1;
  let leveledUp = false;
  let newLevel = level;
  let needed = xpNeededForLevel(level);
  while (xp >= needed) {
    xp -= needed;
    newLevel++;
    needed = xpNeededForLevel(newLevel);
    leveledUp = true;
  }
  if (leveledUp && sock && remoteJid) {
    sock.sendMessage(remoteJid, { text: `🎉 *${name}* vient de passer au niveau ${newLevel} ! 🎉` });
  }
  db.prepare(`
    INSERT INTO users (id, name, xp, level, totalMessages, lastMessage)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      xp = excluded.xp,
      level = excluded.level,
      totalMessages = excluded.totalMessages,
      lastMessage = excluded.lastMessage
  `).run(userId, name, xp, newLevel, total, Date.now());
  return { leveledUp, newLevel };
}

export function getUserRank(userId) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
}

export function getLeaderboard(limit = 10) {
  return db.prepare(`
    SELECT id, name, level, xp, totalMessages
    FROM users ORDER BY level DESC, xp DESC LIMIT ?
  `).all(limit);
}

// Premium functions
export function addPremium(userId) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO premiums (id) VALUES (?)
  `);
  stmt.run(userId);
}

export function removePremium(userId) {
  const stmt = db.prepare(`
    DELETE FROM premiums WHERE id = ?
  `);
  stmt.run(userId);
}

export function isPremium(userId) {
  const stmt = db.prepare(`
    SELECT 1 FROM premiums WHERE id = ?
  `);
  return stmt.get(userId) !== undefined;
}

// Création de la table premiums si elle n'existe pas
db.exec(`
  CREATE TABLE IF NOT EXISTS premiums (
    id TEXT PRIMARY KEY
  )
`);