// config/settings.js
import dotenv from 'dotenv';
dotenv.config();
export default {
  owner: (process.env.OWNER_NUMBER + '@s.whatsapp.net').split(','),
  prefix: process.env.PREFIX || '.',
  botName: process.env.BOT_NAME || 'CyberSec Crew',
  openrouterApiKey: process.env.OPENROUTER_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
};