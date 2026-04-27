import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import qrcode from 'qrcode-terminal';
import { logger } from './utils/logger.js';
import { loadCommands } from './utils/commandLoader.js';
import { handleMessage } from './events/messageCreate.js';
import { handleGroupParticipant } from './events/groupParticipant.js';
import { handleCall } from './events/call.js';
import settings from './config/settings.js';
import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function question(q) { return new Promise(resolve => rl.question(q, resolve)); }

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: ['CyberSec Crew', 'Chrome', '1.0.0'],
  });

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) logger.info('QR ignoré, utilisation du pairing code');
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) setTimeout(() => startBot(), 5000);
      else logger.error('Déconnecté définitivement');
    } else if (connection === 'open') {
      logger.info('✅ CyberSec Crew connecté');
    }
  });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('messages.upsert', async (m) => handleMessage(sock, m));
  sock.ev.on('group-participants.update', (update) => handleGroupParticipant(sock, update));
  sock.ev.on('call', (call) => handleCall(sock, call));

  // Pairing code
  let phone = settings.ownerNumber.split('@')[0];
  if (!phone) phone = await question('Numéro WhatsApp (ex: 243983406034) : ');
  phone = phone.replace(/\D/g, '') + '@s.whatsapp.net';
  logger.info(`Demande de code pour ${phone}`);
  const code = await sock.requestPairingCode(phone);
  logger.info(`📲 Code : ${code} – entrez-le dans WhatsApp > Appareils liés > Lier avec code`);
}

startBot().catch(console.error);