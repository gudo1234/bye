import { WAMessageStubType } from '@whiskeysockets/baileys'
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
      let bienvenida = `${e} *Bienvenido* a ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom1}\n •(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ❖Puedes usar *#menu* para ver la lista de comandos.`
      //await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
      await conn.sendMessage(m.chat, { 
      text: bienvenida,
      contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: `${await conn.getName(m.chat)}`,
              body: `${botname} te da la bienvenida 🎉`,
              thumbnailUrl: img,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: null });
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `${e} *Adiós* De ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom2}\n •(=^●ω●^=)• Te esperamos pronto!\n> ❖Puedes usar *#menu* para ver la lista de comandos.`
      //await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
   await conn.sendMessage(m.chat, { 
      text: bye,
      contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: 'Esperemos que no vuelva -_-',
              thumbnailUrl: img,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: null });
    }
  }

  return true
}
