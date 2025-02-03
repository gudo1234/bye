let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, '🛑 Responde a una imagen o video ViewOnce.', m)

    const msg = m.quoted
    const buffer = await msg.download()

    // Verificamos si el mensaje es un video
    if (msg.type === 'video' && msg.isViewOnce) {
        conn.sendFile(m.chat, buffer, 'media.mp4', msg.caption || '', m, null, { viewOnce: false }) // Cambiamos a viewOnce: false para reenviar
    }
    // Verificamos si el mensaje es una imagen
    else if (msg.type === 'image' && msg.isViewOnce) {
        conn.sendFile(m.chat, buffer, 'media.jpg', msg.caption || '', m, null, { viewOnce: false }) // Cambiamos a viewOnce: false para reenviar
    } else {
        return conn.reply(m.chat, '❌ Solo se puede enviar imágenes o videos ViewOnce.', m)
    }
}

handler.command = ['readviewonce', 'read', 'ver', 'readvo', 'ewonce', 'rvo', 'view']
export default handler
