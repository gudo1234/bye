let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, `⚠️ Responde a un mensaje que quieras reenviar como ViewOnce.`, m);

    // Verificamos si el mensaje citado es un ViewOnce
    let quotedMsg = m.quoted.message;
    if (!quotedMsg) {
        return conn.reply(m.chat, `⚠️ El mensaje citado no es válido.`, m);
    }

    let type = Object.keys(quotedMsg)[0];

    // Asegúrate de que el tipo sea correcto
    if (!['imageMessage', 'videoMessage', 'audioMessage'].includes(type)) {
        return conn.reply(m.chat, `⚠️ Solo se pueden reenviar imágenes, videos o audios como ViewOnce.`, m);
    }

    // Descargamos el contenido del mensaje
    let media = await downloadContentFromMessage(quotedMsg[type], type === 'imageMessage' ? 'image' : type === 'videoMessage' ? 'video' : 'audio');
    let buffer = Buffer.from([]);

    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    // Enviamos el archivo como ViewOnce
    await conn.sendMessage(m.chat, {
        [type]: {
            ...quotedMsg[type],
            viewOnce: true,
        },
        caption: quotedMsg[type].caption || ''
    }, { quoted: m });

    return conn.reply(m.chat, `✅ Mensaje reenviado como ViewOnce.`, m);
}

handler.command = ['readviewonce', 'read', 'ver', 'readvo', 'ewonce', 'rvo', 'view'];

export default handler;
