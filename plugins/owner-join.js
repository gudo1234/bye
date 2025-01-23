let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
    if (!text) return m.reply(`${e} Debes enviar una invitacion para que la bot se una al grupo.`);

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply(`${e} Enlace de invitación no válido.`);

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`${e} Me he unido exitosamente al grupo.`))
            .catch(err => m.reply(`${e} Error al unirme al grupo.`));
    } else {
        let message = `🍭 Invitación a un grupo:\n${text}\n\nPor: @${m.sender.split('@')[0]}`;
        await conn.sendMessage('50492280729' + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`${e} El link del grupo ha sido enviado, gracias por tu invitacion *ฅ^•ﻌ•^ฅ*`);
    }
};

handler.help = ['invite'];
handler.tags = ['owner', 'tools'];
handler.command = ['invite', 'join'];

export default handler;