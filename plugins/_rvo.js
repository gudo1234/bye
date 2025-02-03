let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, `⚠️ Responde a una imagen o video ViewOnce.`, m);
    
    // Verificamos si el mensaje citado es un ViewOnce
    let quotedMsg = m.quoted.message;
    if (!quotedMsg || !quotedMsg.viewOnceMessage) {
        return conn.reply(m.chat, `⚠️ Responde a una imagen o video ViewOnce.`, m);
    }

    // Obtenemos el tipo de mensaje
    let viewOnceMsg = quotedMsg.viewOnceMessage;
    let type = Object.keys(viewOnceMsg)[0];

    // Asegúrate de que el tipo sea correcto
    if (!['imageMessage', 'videoMessage'].includes(type)) {
        return conn.reply(m.chat, `⚠️ El mensaje no es una imagen o video ViewOnce.`, m);
    }

    // Descargamos el contenido del mensaje
    let media = await downloadContentFromMessage(viewOnceMsg, type === 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.concat(await Promise.all([...media]));

    // Enviamos el archivo
    if (/video/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.mp4', viewOnceMsg[type].caption || '', m, null);
    } else if (/image/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.jpg', viewOnceMsg[type].caption || '', m, null);
    }
}

handler.command = ['readviewonce', 'read', 'ver', 'readvo', 'ewonce', 'rvo', 'view'];

export default handler;
