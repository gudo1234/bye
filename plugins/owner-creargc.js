let handler = async (m, { conn, text }) => {
if (!text) return m.reply(`${e} Ingresa un nombre para el grupo.`)
try{
m.reply(`${e} Creando grupo...`)
let group = await conn.groupCreate(text, [m.sender])
let link = await conn.groupInviteCode(group.gid)
m.reply('https://chat.whatsapp.com/' + url)
} catch (e) {
m.reply(`${e} Ocurrió un error.`)
}
}
handler.help = ['grupocrear <nombre>']
handler.tags = ['mods']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.rowner = true
handler.register = true
export default handler
