function handler(m, { text }) {
if (!text) return conn.reply(m.chat, '🍬Por favor, ingresa tu nombre junto al comando.', m, rcanal)
conn.reply(m.chat, '🍭 Buscando el Nombre, espere un momento...', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
m.reply(teks.replace(/[a-z]/gi, v => {
return {
'a': 'ka',
'b': 'tsu',
'c': 'mi',
'd': 'te',
'e': 'ku',
'f': 'hi',
'g': 'ji',
'h': 'ri',
'i': 'ki',
'j': 'zu',
'k': 'me',
'l': 'ta',
'm': 'rin',
'n': 'to',
'o': 'mo',
'p': 'no',
'q': 'ke',
'r': 'shi',
's': 'ari',
't': 'chi',
'u': 'do',
'v': 'ru',
'w': 'mei',
'x': 'na',
'y': 'fu',
'z': 'mori'
}[v.toLowerCase()] || v }))}

handler.help = ['nombreninja *<texto>*']
handler.tags = ['fun']
handler.command = ['nombreninja']
handler.group = true;
handler.register = true

export default handler