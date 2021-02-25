const axios = require('axios');
const url = require('url');
const datefns = require('date-fns');

exports.sendDiscordMsg = async (req, res, next) => {
    let url_parts = url.parse(req.url);
    if(url_parts.href == '/favicon.ico') return next();

    let sendString = `${url_parts.pathname} @${datefns.format(new Date(), 'PPpp')}`

    axios
        .post(process.env.DISCORD_WEBHOOK, {
            content: sendString                        
            
        })        
        .catch((error) => {
            console.error(error)
        })

       
    return next();
}