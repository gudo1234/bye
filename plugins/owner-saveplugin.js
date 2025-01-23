import fs from 'fs';

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`${e} Por favor, ingrese el nombre del plugin.`);
    }

    if (!m.quoted || !m.quoted.text) {
        return m.reply(`${e} Responda al mensaje con el contenido del plugin.`);
    }

    const ruta = `plugins/${text}.js`;
    
    try {
        await fs.writeFileSync(ruta, m.quoted.text);
        m.reply(`${e} Guardando plugin en ${ruta}`);
    } catch (error) {
        m.reply(`${e} Ocurrió un error al guardar el plugin: ${error.message}`);
    }
};

handler.help = ['saveplugin'];
handler.tags = ['owner'];
handler.command = ["saveplugin"];
handler.owner = true;

export default handler;