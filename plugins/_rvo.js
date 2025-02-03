let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, `⚠️ Responde a una imagen o video ViewOnce.`, m);
    if (m.quoted.mtype !== 'viewOnceMessageV2' && m.quoted.mtype !== 'viewOnceMessage') {
        return conn.reply(m.chat, `⚠️ Responde a una imagen o video ViewOnce.`, m);
    }

    let msg = m.quoted.message;
    let type = Object.keys(msg)[0];

    // Asegúrate de que el tipo sea correcto
    if (!['imageMessage', 'videoMessage'].includes(type)) {
        return conn.reply(m.chat, `⚠️ El mensaje no es una imagen o video ViewOnce.`, m);
    }

    let media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.from([]);

    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    if (/video/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m, null);
    } else if (/image/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m, null);
    }
}

handler.command = ['readviewonce', 'read', 'ver', 'readvo', 'ewonce', 'rvo', 'view'];

export default handler;
