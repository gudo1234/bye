let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, '🛑 Responde a una imagen ViewOnce.', m)

    const msg = m.quoted
    const buffer = await msg.download()

    // Para video
    if (msg.type === 'video') {
        conn.sendFile(m.chat, buffer, 'media.mp4', msg.caption || '', m, null, { viewOnce: true })
    }
    // Para foto
    else if (msg.type === 'image') {
        conn.sendFile(m.chat, buffer, 'media.jpg', msg.caption || '', m, null, { viewOnce: true })
    } else {
        return conn.reply(m.chat, '❌ Solo se puede enviar imágenes o videos ViewOnce.', m)
    }
}

handler.command = ['readviewonce', 'read', 'ver', 'readvo', 'ewonce', 'rvo', 'view']
export default handler
