import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/casQP.jpg')
  let im = await (await fetch(`${pp}`)).buffer()

  if (chat.welcome) {
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `${e} *Bienvenido* a ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom1}\n •(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ❖Puedes usar *#menu* para ver la lista de comandos.`
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
              title: '✶⊶⊷⊶⊷❍⊶⊷⊶⊷✶',
              body: `${botname} te da la bienvenida 🎉`,
              thumbnailUrl: im,
              thumbnail: im,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: null });
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `${e} *Adiós* De ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom2}\n •(=^●ω●^=)• Te esperamos pronto!\n> ❖Puedes usar *#menu* para ver la lista de comandos.`
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
              title: '✶⊶⊷⊶⊷❍⊶⊷⊶⊷✶',
              body: 'Esperemos que no vuelva',
              thumbnailUrl: im,
              thumbnail: im,
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
