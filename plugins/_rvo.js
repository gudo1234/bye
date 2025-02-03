const utils = new(require("#utils"));
const baileys = require("@adiwajshing/baileys");

// Asegúrate de definir la variable 'e' antes de usarla
const e = '⚠️'; // Puedes cambiar el emoji o mensaje según prefieras

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!m.quoted) {
            return m.reply(`${e} Responde a un mensaje de una vista junto al mismo comando.`);
        }
        // Verificamos que el tipo de mensaje sea el correcto
        if (m.quoted.type === "viewOnceMessage" || m.quoted.type === "viewOnceMessageV2" || m.quoted.viewOnce === true) {
            let message = m.quoted;
            let generateMessage = baileys.proto.WebMessageInfo.fromObject({
                key: message.key,
                message: {
                    [m.quoted.type]: message
                }
            });
            delete generateMessage.message[Object.keys(generateMessage.message)[0]].viewOnce;
            generateMessage.message[Object.keys(generateMessage.message)[0]].contextInfo = {
                mentionedJid: utils.mention(message?.text) || null // Cambié 'body' por 'text'
            };
            const response = baileys.generateWAMessageFromContent(m.chat, generateMessage.message, {
                userJid: conn.user.jid,
                quoted: m
            });
            return conn.relayMessage(m.chat, response.message, {
                messageId: response.key.id
            });
        } else {
            return m.reply(`${e} Este no es un mensaje de una vista.`);
        }
    } catch (err) {
        console.error(err); // Para ver el error en la consola
        return m.reply(`${e} Ocurrió un error: ${err.message}`);
    }
}

handler.command = ['rvo'];
// handler.group = true; // Descomentar si necesitas que funcione solo en grupos
export default handler;
