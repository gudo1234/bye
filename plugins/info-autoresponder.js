let handler = async (m, { conn, text, usedPrefix, command, isOwner, isAdmin, isROwner }) => {
if (!(isOwner || isAdmin || isROwner)) {
conn.reply(m.chat, `${e} Lo siento no puedes personalizar el autoresponder en este grupo/chat.`, m)
}
const chatData = global.db.data.chats[m.chat]
if (text) {
if (chatData.sAutoresponder) return conn.reply(m.chat, `${e} *Ya hay un prompt en uso, si quieres configurar otro escribe: ${usedPrefix + command}, hazlo sin texto.*`, m)

chatData.sAutoresponder = text
conn.reply(m.chat, `${e} *Configuración con éxito.*\n\nSi el autoresponder está desactivado activalo usando:\n> » ${usedPrefix}on autoresponder`, m)
} else {
if (chatData.sAutoresponder) {
chatData.sAutoresponder = ''
conn.reply(m.chat, `${e} *Prompt borrado con éxito.*`, m, fake)
} else {
conn.reply(m.chat, `${e} *No hay Prompt personalizado en este chat.*\n\nPuedes perzonalizar el autoresponder usando:\n> » ${usedPrefix + command} + texto que quieres que lo interactúe.`, m)
}}
}

handler.tags = ['info']
handler.help = ['editautoresponder']
handler.command = ['editautoresponder', 'autoresponder2']
handler.group = true
export default handler