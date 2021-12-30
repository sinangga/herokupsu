const { readFileSync } = require('fs')
const { Composer } = require('micro-bot')
const bot = new Composer()
const download = require('download')
const gm = require('gm')
const sharp = require('sharp');

var d = new Date();
var yy = d.getUTCFullYear()
var yy = yy.toString ()
if (d.getUTCMonth() <= 8) {
	var mm = 1+d.getUTCMonth()
	var mm = "0"+mm
  var mm = mm.toString ();
} else {
  	var mm = 1+d.getUTCMonth()
    var mm = mm.toString ();
}

var jam = d.getUTCHours()
if (jam < 12 ) {
    jam = "070000";
} else {
    jam = "070000"
}


/////////////////////////////////////////////////////////////////////
//                                                                 //
//              HEADER BOT TELEGRAM                                //
//            (modified by.sinangga)                               //
//                                                                 //
/////////////////////////////////////////////////////////////////////
bot.start((ctx) => ctx.replyWithPhoto({ source : 'PANGSUMA.jpg' },
    {
        reply_markup: {
            inline_keyboard: [
[{text: "ANALISIS BANJIR 📖", callback_data: "analisisbanjir"}],
                [{text: "CUACA HARIAN ☀️🌤⛅️", callback_data: "harian"}],
                [{text: "PRAKIRAAN 3 HARI ⏳", callback_data: "tigahari"}, {text: "PRAKIRAAN 1 MINGGU 📅", callback_data: "mingguan"}],
                [{text: "KEBAKARAN HUTAN DAN LAHAN 🔥", callback_data: "karhutla"}],
                [{text: "SEBARAN TITIK PANAS KAPUAS HULU 📍🔥", callback_data: "maps"}],
                [{text: "POTENSI BANJIR HARIAN 🌊", callback_data: "banjir"}],
                [{text: "SATELIT 🛰", callback_data: "satelit"}, {text: "RADAR 📡", callback_data: "radar"}, {text: "ANGIN 🌪", callback_data: "angin"}],
				[{text: "TAFOR 📖", callback_data: "tafor"}],
                [{text: "BULETIN 📖", callback_data: "buletin"}],                													//
                [{text: "SURVEI KEPUASAN MASYARAKAT", callback_data: "IKM"}],
		        [{text: "INFO SELENGKAPNYA HUBUNGI ADMIN", callback_data: "chatad"}]
            ]
        }
    })
)

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//      SCRIPT BACK TO MENU                                                   //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

bot.action("menu", (ctx)=>{
    ctx.reply(' KLIK INFORMASI YANG ANDA INGINKAN ',
    {
        reply_markup: {
            inline_keyboard: [
[{text: "ANALISIS BANJIR 📖", callback_data: "analisisbanjir"}],
                [{text: "CUACA HARIAN ☀️🌤⛅️", callback_data: "harian"}],
                [{text: "PRAKIRAAN 3 HARI ⏳", callback_data: "tigahari"}, {text: "PRAKIRAAN 1 MINGGU 📅", callback_data: "mingguan"}],
                [{text: "KEBAKARAN HUTAN DAN LAHAN 🔥", callback_data: "karhutla"}],
                [{text: "SEBARAN TITIK PANAS KAPUAS HULU 📍🔥", callback_data: "maps"}],
                [{text: "POTENSI BANJIR HARIAN 🌊", callback_data: "banjir"}],
                [{text: "SATELIT 🛰", callback_data: "satelit"}, {text: "RADAR 📡", callback_data: "radar"}, {text: "ANGIN 🌪", callback_data: "angin"}],
                [{text: "TAFOR 📖", callback_data: "tafor"}],
				[{text: "BULETIN 📖", callback_data: "buletin"}],                													//
                [{text: "SURVEI KEPUASAN MASYARAKAT", callback_data: "IKM"}],
		        [{text: "INFO SELENGKAPNYA HUBUNGI ADMIN", callback_data: "chatad"}]
            ]
        }
    })
})

////////////////////////////////////////////////////////////////////////
//                                                                    //
//             PARAMETER INPUT                                        //
//                                                                    //
////////////////////////////////////////////////////////////////////////
     
bot.action('satelit', (ctx)=>{
    ctx.reply('BERIKUT ADALAH CITRA SATELIT HIMAWARI KANAL ENHANCED IR DAN RAINFALL POTENTIAL')
    ctx.replyWithPhoto(
        {
            source: download("https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_EH_Kalbar.png")
        }
    ),
    ctx.replyWithPhoto(
        {
            source: download("https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_RP_Kalbar.png")
        }
    ,
	{
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    })
})

bot.action('radar', (ctx)=>{
    ctx.reply('BERIKUT ADALAH CITRA RADAR')
    ctx.replyWithPhoto(
        {
            source: download('https://inderaja.bmkg.go.id/Radar/SINT_SingleLayerCRefQC.png')
        },
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})

bot.action('karhutla', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI KEBAKARAN HUTAN DAN LAHAN')
    ctx.replyWithPhoto(
        {
            source: download('https://inderaja.bmkg.go.id/IMAGE/HOTSPOT/Hotspot_Kalbar.png')
        })
    ctx.replyWithPhoto(
        {
            source: "hotspread.png"
        })
    ctx.replyWithPhoto(
        {
            source: "karhut.png"
        },
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})

bot.action('maps', (ctx)=>{
    ctx.reply(
        "https://www.google.com/maps/d/embed?mid=1HmpHp-zFFjKYmXiD-cUr7q9ZjbUswdtG",
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})

bot.action('banjir', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI POTENSI BANJIR HARIAN')
    ctx.replyWithPhoto(
        {
            source: download('http://web.meteo.bmkg.go.id/media/data/bmkg/ibfnew/20_kalbar_00.png')
            },
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})

bot.action('tafor', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI PENUNJANG PEMBUATAN TAFOR')
    const jamm = ["070000","100000","130000", "160000","190000"]
    var dtdate = d.getUTCDate() + 1;
    var tgl = yy + mm + dtdate;
    for (const ttgl in jamm) {  
	    ctx.replyWithPhoto(
            {
                source: download('http://web.meteo.bmkg.go.id/media/data/bmkg/mfy/wrf/prakiraan/RAIN/rainrate_wrf10km_sfc_'+tgl+`${jamm[ttgl]}`+'.png')
	        },
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: "MENU UTAMA", callback_data: "menu"}]
                ]
            }
        }) 
    }
})

bot.action('angin', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI STREAMLINE ANGIN')
    ctx.replyWithPhoto(
        {
            source: download('http://web.meteo.bmkg.go.id//media/data/bmkg/Angin3000ft/Streamline_'+tgl+jam+'.jpg')
        },
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})

bot.action('harian', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI CUACA HARIAN')
    ctx.replyWithPhoto(
        {
            source: "harian.jpg"
        },
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})

bot.action('tigahari', (ctx)=>{
    ctx.reply('BERIKUT ADALAH PRAKIRAAN CUACA TIGA HARI KE DEPAN')
    ctx.replyWithPhoto(
        {
            source: "3hari.png" 
        },
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]   
            ]
        }
    }) 
})

bot.action('mingguan', (ctx)=>{
    ctx.reply('BERIKUT ADALAH PRAKIRAAN CUACA SATU MINGGU KEDEPAN')
    ctx.replyWithPhoto(
        {
            source: "mingguan.png"
        },
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    })
})

bot.action('buletin', (ctx)=>{
    ctx.reply('BERIKUT ADALAH BULETIN CUACA BULANAN')
    ctx.reply('Mohon Menunggu Sampai PDF Muncul (berdasarkan kecepatan internet)')
    ctx.replyWithDocument(
        {
            source: "BuletinAug.pdf"},
        {
            thumb: {
                    source: "thumb.jpg" 	// thumbnail Buletin
                },
                    reply_markup: {
                    inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    })
})


bot.action('analisisbanjir', (ctx)=>{
    ctx.reply('BERIKUT ADALAH ANALISIS KEJADIAN BANJIR')
    ctx.reply('Mohon Menunggu Sampai PDF Muncul (berdasarkan kecepatan internet)')
    ctx.replyWithDocument(
        {
            source: "Analisisbanjir.pdf"},
        {
            thumb: {
                    source: "thumb.jpg" 	// thumbnail Buletin
                },
                    reply_markup: {
                    inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    })
})


bot.action('IKM', (ctx)=>{
    ctx.reply('SILAKAN MENGISI SURVEI KEPUASAN MASYARAKAT')
    ctx.reply('BUKA LINK YANG TERTERA DI BAWAH INI')
    ctx.reply('https://forms.gle/Px3f5v75XkuHHn5C9',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
        ]}
    })
})

bot.action('chatad', (ctx)=> {
	ctx.reply('https://t.me/bmkgpangsuma',
	{
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
        ]}
    })
})
////////////////////////////////////////////////////////////////////////


///////////////////////////////////
//    Export Bot Handler         //
///////////////////////////////////
module.exports = bot
