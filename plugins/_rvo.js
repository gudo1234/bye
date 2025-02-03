const utils = new(require("#utils"));
const baileys = require("@adiwajshing/baileys");

let handler = async (m, { conn, args, usedPrefix, command }) => {

        try {
            if (!m.quoted) {
                return m.reply(`${e} Responde a un mensaje de una vista junto al mismo comando.`);
            }
            if (m.quoted.type === "viewOnceMessage" || m.quoted.type == "viewOnceMessageV2" || m.quoted.viewOnce == true) {
                let message = m.quoted
                let generateMessage = baileys.proto.WebMessageInfo.fromObject({
                    key: message.key,
                    message: {
                        [m.quoted.type]: message
                    }
                });
                delete generateMessage.message[Object.keys(generateMessage.message)[0]].viewOnce
                generateMessage.message[Object.keys(generateMessage.message)[0]].contextInfo = {
                    mentionedJid: utils.mention(message?.body) || null
                }
                const response = baileys.generateWAMessageFromContent(m.chat, generateMessage.message, {
                    userJid: conn.user.jid,
                    quoted: m
                })
                return conn.relayMessage(m.chat, response.message, {
                    messageId: response.key.id
                })
            } else {
                return m.reply(`${e} Este no es un mensaje de una vista.`);
            }
        } catch (err) {
            return m.reply(`${e} error`)
        }
    }

handler.command = ['rvo']
//handler.group = true
export default handler
