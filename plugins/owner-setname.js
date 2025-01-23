let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply(`${e} Por favor, proporciona un nombre para el bot.\n> Ejemplo: #setname Nombre/Texto`);

  const names = text.split('/');
  if (names.length !== 2) return m.reply(`${e} Por favor, proporciona ambos nombres separados por una barra (/) en el formato: nombre1/nombre2.`);

  global.botname = names[0].trim();
  const texto1bot = ', Powered By ꪃꒉܻᵃₚͬ៰⍳';
  global.textbot = `${names[1].trim()}${texto1bot}`;
  
  m.reply(`${e} El nombre del bot ha sido cambiado a: ${global.botname}\n\nEl texto del bot ha sido cambiado a: ${global.textbot}`);
};

handler.help = ['setname'];
handler.tags = ['tools'];
handler.command = ['setname'];
handler.rowner = true;

export default handler;
