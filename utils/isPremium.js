// utils/isPremium.js
import configmanager from './configmanager.js';

export function isPremium(userId) {
  // userId format: "243983406034@s.whatsapp.net"
  const number = userId.split('@')[0];
  const key = `p_${number}`;
  return !!(configmanager.premiums?.premiumUser?.[key]);
}