/*import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg';

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `${e} *Bienvenido* a ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom1}\n •(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ⊹Puedes usar *#menu* para ver la lista de comandos.`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `${e} *Adiós* De ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom2}\n •(=^●ω●^=)• Te esperamos pronto!\n> ⊹Puedes usar *#menu* para ver la lista de comandos.`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}*/

import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
export async function before(m, { conn, participants, groupMetadata }) {

  if (!m.messageStubType || !m.isGroup) return true;
let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => img.getRandom())
  let img = await (await fetch(`${pp}`)).buffer()
  
  let chat = global.db.data.chats[m.chat];
  const user = `@${m.sender.split`@`[0]}`;
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let userName = user ? user.name : await conn.getName(who);
  let bienvenida = `${e} Bienvenido *@${m.messageStubParameters[0].split`@`[0]}*\n${global.welcom1}\n ٩(๑❛ᴗ❛๑)۶ Disfruta tu estadía en el grupo!\n> ✎Puedes usar *#menu* para ver la lista de comandos.`
  let bye = `${e} Adios *@${m.messageStubParameters[0].split`@`[0]}*\n${global.welcom2}\n ٩(๑❛ᴗ❛๑)۶ Te esperamos pronto!\n> ✎Puedes usar *#menu* para ver la lista de comandos.`

// Welcome 
if (chat.welcome && m.messageStubType == 27) {
await conn.sendMessage(m.chat, {
      text: bienvenida,
      contextInfo: {
          mentionedJid: [m.messageStubParameters[0]],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: 'Bienvenido a',
              body: `${groupMetadata.subject}`,
              thumbnailUrl: img,
              thumbnail: img,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: null });
};

// bye 
  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
await conn.sendMessage(m.chat, {
      text: bye,
      contextInfo: {
          mentionedJid: [m.messageStubParameters[0]],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: wm,
              body: 'Esperemos que no vuelva -_-',
              thumbnailUrl: img,
              thumbnail: img,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: null });
  };
};
