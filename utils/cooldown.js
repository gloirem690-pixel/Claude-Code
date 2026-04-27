const cooldowns = new Map();
export async function cooldownCheck(userId, command, seconds) {
  const key = `${userId}:${command}`;
  const now = Date.now();
  if (cooldowns.has(key) && now - cooldowns.get(key) < seconds * 1000) return true;
  cooldowns.set(key, now);
  return false;
}