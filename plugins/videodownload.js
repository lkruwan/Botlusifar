const MyPnky = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const config = require('../config');
const Pinky = require('../pinky');
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;
//============================== LYRICS =============================================
const axios = require('axios');
const { requestLyricsFor, requestAuthorFor, requestTitleFor, requestIconFor } = require("solenolyrics");
const solenolyrics= require("solenolyrics"); 
//============================== CURRENCY =============================================
const { exchangeRates } = require('exchange-rates-api');
const ExchangeRatesError = require('exchange-rates-api/src/exchange-rates-error.js')
//============================== TTS ==================================================
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-translate-tts');
//=====================================================================================
//============================== YOUTUBE ==============================================
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});
//=====================================================================================
const Language = require('../language');
const Lang = Language.getString('scrapers');
const Glang = Language.getString('github');
const Slang = Language.getString('lyrics');
const Clang = Language.getString('covid');

const wiki = require('wikijs').default;
var gis = require('g-i-s');
const YTV_DESC = "Youtube Video Downloader V2 ."
const YT_NEED = "*need word!.*"
const DWLOAD_VID = "*🎭Downloading Your Video...*"
const YTV_UP = "*🚀Uploading Your Video...*"
const NO_RESULT = "*🌀can't Find Anything...*"


if (Config.WORKTYPE == 'private') {

    MyPnky.addCommand({ pattern: 'video ?(.*)', fromMe: true, desc: Lang.VIDEO_DESC,  deleteCommand: false}, async (message, match) => {

        const link = match[1]
    
        if (!link) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text)
        await message.client.sendMessage(message.jid,DWLOAD_VID,MessageType.text);
        await axios
          .get(`https://api.zeks.xyz/api/ytplaymp4/2?apikey=VI6j4t4wCbwoc6Deh5wgrJL2Kt1&q=${link}`)
          .then(async (response) => {
            const {
              link,
            } = response.data.result
    
            const videoBuffer = await axios.get(link, {responseType: 'arraybuffer'})
    
            await message.client.sendMessage(message.jid,YTV_UP,MessageType.text);
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.document, {mimetype: Mimetype.mp4, ptt: false, thumbnail: thumb})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
}

else if (Config.WORKTYPE == 'public') {
    MyPnky.addCommand({ pattern: 'video ?(.*)', fromMe: false, desc: Lang.VIDEO_DESC}, async (message, match) => {

        const link = match[1]
    
        if (!link) return await message.client.sendMessage(message.jid,YT_NEED,MessageType.text, {quoted: message.data})
         await message.client.sendMessage(message.jid,DWLOAD_VID,MessageType.text)
        await axios
          .get(`https://api.zeks.xyz/api/ytplaymp4/2?apikey=VI6j4t4wCbwoc6Deh5wgrJL2Kt1&q=${link}`)
          .then(async (response) => {
            const {
              link,
            } = response.data.result
    
            const videoBuffer = await axios.get(link, {responseType: 'arraybuffer'})
    
            await message.client.sendMessage(message.jid,YTV_UP,MessageType.text, {quoted: message.data});
            await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.document, {mimetype: Mimetype.mp4, ptt: false, thumbnail: thumb})
        })
        .catch(
          async (err) => await message.client.sendMessage(message.jid,NO_RESULT,MessageType.text, {quoted: message.data}),
        )
      },
    )
}


const thumb  = fs.readFileSync('./uploads//thumb/taptodown.jpg')
