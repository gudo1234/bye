const handler = async (m, {text}) => {
const user = global.db.data.users[m.sender];
user.afk = + new Date;
user.afkReason = text;
conn.reply(m.chat, `${e} *El Usuario ${conn.getName(m.sender)} Estará Inactivo*\n\n*Motivo: ${text ? ': ' + text : 'Sin Especificar!'}*
`, m, rcanal);
};
handler.help = ['afk [alasan]'];
handler.tags = ['main'];
handler.command = ['afk'];
handler.group = true
export default handler;
