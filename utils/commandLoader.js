import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { logger } from './logger.js';
const commands = new Map();
export function loadCommands(dir = 'commands') {
  const absolute = join(process.cwd(), dir);
  const files = readdirSync(absolute);
  for (const file of files) {
    const full = join(absolute, file);
    if (statSync(full).isDirectory()) loadCommands(join(dir, file));
    else if (file.endsWith('.js') && file !== '_template.js') {
      import(`../${dir}/${file}`).then(mod => {
        const cmd = mod.default;
        if (cmd.name && cmd.execute) {
          commands.set(cmd.name, cmd);
          if (cmd.aliases) cmd.aliases.forEach(alias => commands.set(alias, cmd));
          logger.info(`Commande chargée : ${cmd.name}`);
        } else logger.warn(`Fichier ${file} invalide`);
      });
    }
  }
  return commands;
}
export function getCommand(name) { return commands.get(name); }