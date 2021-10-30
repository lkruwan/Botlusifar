
const lusifar = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const { errorMessage, infoMessage } = require('../helpers');
const YTV_DESC = "Youtube Video Downloader "
const YT_NEED = "*need word!.*"
const DWLOAD_VID = "*🎭Downloading Your Video...*"
const YTV_UP = "*🚀Uploading Your Video...*"
const NO_RESULT = "*🌀can't Find Anything...*"


//උස්සන්නද ආවෙ බේසිකයෝ.බොහොම අමාරුවෙන් හැදුවෙ.උස්සන එකා අවජාතකයෙක් කියල හිතාගන්න පුලුවන් පොන්න හැත්ත.හුකන පොන්නයෝ
    lusifar.addCommand({ pattern: 'xyz ?(.*)', fromMe: false, deleteCommand: false, desc:'video download',  deleteCommand: false}, async (message, match) => {
        const linkk = match[1]
        if (!linkk) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        
        await axios
          .get(`https://hardianto-chan.herokuapp.com/api/download/play?query=${linkk}&apikey=hardianto`)
          .then(async (response) => {
            const {
              url,title,thumbnail,ago,views
            } = response.data.information
            const videoBuffer = await axios.get(thumbnail, {responseType: 'arraybuffer'})
            
            const cptt = "*📑Title:*  " + title + "\n\n" + "*📅Uploded date:* " + ago + "\n\n" + "*🎞️ Video link:* " +  url + "\n\n" + "*👁️Views:* " + views
            

            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.image, {quoted: message.data ,mimetype: Mimetype.jpg, ptt: false,caption: cptt})
        })
       
      },
    )
