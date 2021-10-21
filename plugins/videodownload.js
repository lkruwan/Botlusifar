const amazone = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const { errorMessage, infoMessage } = require('../helpers');
const YTV_DESC = "Youtube Video Downloader V2 ."
const YT_NEED = "*need word!.*"
const DWLOAD_VID = "*🎭Downloading Your Video...*"
const YTV_UP = "*🚀Uploading Your Video...*"
const NO_RESULT = "*🌀can't Find Anything...*"

    amazone.addCommand({ pattern: 'video ?(.*)', fromMe: false, deleteCommand: false, desc:'video download',  deleteCommand: false}, async (message, match) => {
        const linkk = match[1]
        if (!linkk) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        
        await axios
          .get(`https://rei-api.herokuapp.com/api/dl/ytav?url=${linkk}`)
          .then(async (response) => {
            const {
              url,title,thumb,published,channel,views
            } = response.data.result
            const videoBuffer = await axios.get(thumb, {responseType: 'arraybuffer'})
            
            const cptt = title + "\n" + published + "\n" +  channel + "\n" + views
            

            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.image, {quoted: message.data ,mimetype: Mimetype.jpg, ptt: false,caption: cptt})
        })
       
      },
    )

    amazone.addCommand({ pattern: 'video ?(.*)', fromMe: false, deleteCommand: false, desc:'video download',  deleteCommand: false}, async (message, match) => {
        const linkk = match[1]
        if (!linkk) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        await message.client.sendMessage(message.jid,DWLOAD_VID,MessageType.text , {quoted: message.data});
        await axios
          .get(`https://rei-api.herokuapp.com/api/dl/ytavv2?url=${linkk}`)
          .then(async (response) => {
            const {
              link,
            } = response.data.result
            const videoBuffer = await axios.get(link, {responseType: 'arraybuffer'})
            await message.client.sendMessage(message.jid,YTV_UP,MessageType.text , {quoted: message.data});
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.video, {quoted: message.data ,mimetype: Mimetype.mp4, ptt: false})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
    
    
    amazone.addCommand({ pattern: 'video ?(.*)', fromMe: true, deleteCommand: false, desc:'video download',  deleteCommand: false}, async (message, match) => {
        const linkk = match[1]
        if (!linkk) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        
        await axios
          .get(`https://rei-api.herokuapp.com/api/dl/ytav?url=${linkk}`)
          .then(async (response) => {
            const {
              url,title,thumb,published,channel,views
            } = response.data.result
            const videoBuffer = await axios.get(thumb, {responseType: 'arraybuffer'})
            
            const cptt = title + "\n" + published + "\n" +  channel + "\n" + views
            

            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.image, {quoted: message.data ,mimetype: Mimetype.jpg, ptt: false,caption: cptt})
        })
       
      },
    )

    amazone.addCommand({ pattern: 'video ?(.*)', fromMe: true, deleteCommand: false, desc:'video download',  deleteCommand: false}, async (message, match) => {
        const linkk = match[1]
        if (!linkk) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        await message.client.sendMessage(message.jid,DWLOAD_VID,MessageType.text , {quoted: message.data});
        await axios
          .get(`https://rei-api.herokuapp.com/api/dl/ytavv2?url=${linkk}`)
          .then(async (response) => {
            const {
              link,
            } = response.data.result
            const videoBuffer = await axios.get(link, {responseType: 'arraybuffer'})
            await message.client.sendMessage(message.jid,YTV_UP,MessageType.text , {quoted: message.data});
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.video, {quoted: message.data ,mimetype: Mimetype.mp4, ptt: false})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )    
