let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `${e} *Ingrese el error que desea reportar.*`, m)
    if (text.length < 10) return conn.reply(m.chat, `${e} *Especifique bien el error, mínimo 10 caracteres.*`, m)
    if (text.length > 1000) return conn.reply(m.chat, `${e} *Máximo 1000 caracteres para enviar el error.*`, m)
    const teks = `*✖️ \`R E P O R T E\` ✖️*

☁️ Número:
• Wa.me/${m.sender.split`@`[0]}

👤 Usuario: 
• ${m.pushName || 'Anónimo'}

💬 Mensaje:
• ${text}`
    await conn.reply('50492280729@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

    m.reply(`${e} *El reporte se envío a mi creador, cualquier informe falso puede ocasionar baneo.*`)
}
handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error']
handler.group = true
export default handler