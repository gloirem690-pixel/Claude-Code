// events/messageCreate.js
import settings from '../config/settings.js';
import { getCommand } from '../utils/commandLoader.js';
import { cooldownCheck } from '../utils/cooldown.js';
import { addXP } from '../utils/rankManager.js';
import { logger } from '../utils/logger.js';
import { antilinkSettings, warnStorage } from '../utils/groupStore.js';
import configmanager from '../utils/configmanager.js';   // ← AJOUT pour autoréaction

// Fonction de détection des liens (antilink) – déjà présente
async function linkDetection(sock, msg) {
  // ... garde le code que tu as déjà (fourni plus tôt)
  // (Je ne le réécris pas ici pour éviter la répétition)
}

export async function handleMessage(sock, m) {
  const msg = m.messages[0];
  if (!msg?.message) return;
  const remoteJid = msg.key.remoteJid;
  const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
  const fromMe = msg.key.fromMe;
  const sender = msg.key.participant || remoteJid;
  const senderNumber = sender.split('@')[0];
  if (!messageText || fromMe) return;

  const isCommand = messageText.startsWith(settings.prefix);

  // === AJOUT XP (sauf commandes) ===
  if (!isCommand) {
    try {
      await addXP(senderNumber, msg.pushName || senderNumber, 10, sock, remoteJid);
    } catch (err) {
      logger.error('Erreur addXP:', err);
    }
  }

  // === AUTO‑RÉACTION (si configurée) ===
  const botNumber = sock.user.id.split(':')[0];
  if (configmanager.config.users[botNumber]?.autoreact && configmanager.config.users[botNumber]?.reaction) {
    await sock.sendMessage(remoteJid, {
      react: { text: configmanager.config.users[botNumber].reaction, key: msg.key }
    });
  }

  // === GESTION DES COMMANDES ===
  if (isCommand) {
    const args = messageText.slice(settings.prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    const cmd = getCommand(commandName);
    if (cmd) {
      if (await cooldownCheck(senderNumber, commandName, cmd.cooldown || 3)) {
        return sock.sendMessage(remoteJid, { text: `⏳ Attendez ${cmd.cooldown || 3}s avant de réutiliser cette commande.` });
      }
      if (cmd.adminOnly && !settings.owner.includes(senderNumber)) {
        return sock.sendMessage(remoteJid, { text: '🔒 Commande réservée au propriétaire.' });
      }
      try {
        await cmd.execute(sock, msg, args);
        logger.info(`Commande ${commandName} exécutée par ${senderNumber}`);
      } catch (err) {
        logger.error(`Erreur commande ${commandName}: ${err.message}`);
        sock.sendMessage(remoteJid, { text: `❌ Erreur: ${err.message}` });
      }
    }
  }

  // === DÉTECTION DES LIENS (ANTILINK) ===
  await linkDetection(sock, msg);
}