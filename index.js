//const 
/*
bot.start((ctx)=> {                                                                                                               //
    ctx.replyWithPhoto(                                                                                                             //
        {                                                                                                                           //
            source: "PANGSUMA.jpg"                                                                                                  //
        },                                                                                                                          //
    {                                                                                                                               //
        reply_markup: {                                                                                                             //
            inline_keyboard : [                                                                                                     //
                [{text: "MULAI", callback_data: "mulai"}]                                                                           //
            ]                                                                                                                       //
        }                                                                                                                           //
    })                                                                                                                              //                                                                                                                                    //
}) 
*/
// module.exports = ({ reply }) => reply('42')

const { readFileSync } = require('fs')
const { Composer } = require('micro-bot')
const bot = new Composer()

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Help message'))
bot.hears('hi', ({ reply }) => reply('Hello'))
bot.on('sticker', ({ reply }) => reply('👍'))

// Export bot handler
module.exports = bot