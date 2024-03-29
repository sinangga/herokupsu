const { readFileSync } = require('fs')
//const { Composer } = require('micro-bot')
//const bot = new Composer()
const Telegraf = require('telegraf')
const bot = new Telegraf('5693541815:AAFx1MyE2TKpf7i6P0S4bJRA1RnF1HW3SB8')
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
if (d.getUTCDate() <= 9) {
	var dd = "0"+ d.getUTCDate()
  var dd = dd.toString ();
} else {
  	var dd = d.getUTCDate();
}
var ddsiang = yy+mm+dd;
var jam = d.getUTCHours()
if (jam < 12 ) {
    jam = "070000";
} else {
    jam = "070000"
}

const jamm = ["070000","100000","130000", "160000","190000"]
const jamsiang = ["130000", "160000","190000","220000"]

var day = new Date();
var nextDay = new Date(day);
nextDay.setDate(day.getDate() + 1);
let datenow = new Date(nextDay);
var tglplus = (generateDatabaseDateTime(datenow));
function generateDatabaseDateTime(date) {
  const p = new Intl.DateTimeFormat('en', {
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12: false
  }).formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
      return acc;
  }, {});

  return `${p.year}${p.month}${p.day}`;
}


/////////////////////////////////////////////////////////////////////
//                                                                 //
//              HEADER BOT TELEGRAM                                //
//            (modified by.sinangga)                               //
//            [{text: "ANALISIS BANJIR 📖", callback_data: "analisisbanjir"}],
//            [{text: "CUACA HARIAN ☀️🌤⛅️", callback_data: "harian"}],
//            [{text: "PRAKIRAAN 3 HARI ⏳", callback_data: "tigahari"}, {text: "PRAKIRAAN 1 MINGGU 📅", callback_data: "mingguan"}],
//            [{text: "SEBARAN TITIK PANAS KAPUAS HULU 📍🔥", callback_data: "maps"}],
//            [{text: "SURVEI KEPUASAN MASYARAKAT", callback_data: "IKM"}],
/////////////////////////////////////////////////////////////////////

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
                [{text: "KEBAKARAN HUTAN DAN LAHAN 🔥", callback_data: "karhutla"}],
		[{text: "SEBARAN TITIK PANAS KAPUAS HULU 📍🔥", callback_data: "maps"}],
                [{text: "POTENSI BANJIR HARIAN 🌊", callback_data: "banjir"}],
                [{text: "SATELIT 🛰", callback_data: "satelit"}, {text: "RADAR 📡", callback_data: "radar"}, {text: "ANGIN 🌪", callback_data: "angin"}],
                [{text: "BAHAN TAFOR 23.00 UTC 📈🌤", callback_data: "tafor"}],
                [{text: "BAHAN TAFOR 05.00 UTC 📈🌤", callback_data: "taforsiang"}],
                [{text: "BULETIN 📖", callback_data: "buletin"}],
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
                [{text: "KEBAKARAN HUTAN DAN LAHAN 🔥", callback_data: "karhutla"}],
		[{text: "SEBARAN TITIK PANAS KAPUAS HULU 📍🔥", callback_data: "maps"}],
                [{text: "POTENSI BANJIR HARIAN 🌊", callback_data: "banjir"}],
                [{text: "SATELIT 🛰", callback_data: "satelit"}, {text: "RADAR 📡", callback_data: "radar"}, {text: "ANGIN 🌪", callback_data: "angin"}],
                [{text: "BAHAN TAFOR PAGI 📈🌤", callback_data: "tafor"}],
                [{text: "BAHAN TAFOR SIANG 📈🌤", callback_data: "taforsiang"}],
		        [{text: "BULETIN 📖", callback_data: "buletin"}],
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
    ctx.reply('BERIKUT ADALAH INFORMASI POTENSI BANJIR UNTUK HARI INI')
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
    ctx.reply("PILIH PARAMETER CUACA YANG ANDA INGINKAN",
    {
        reply_markup: {
            inline_keyboard: [
		[{text: "RAINRATE", callback_data: "rainrate"}, {text: "SUHU", callback_data: "suhu"}, {text: "KELEMBAPAN", callback_data: "kelembapan"}],
                [{text: "CONTOH TAFOR", callback_data: "cthtafor"}],
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})

bot.action('taforsiang', (ctx)=>{
    ctx.reply("PILIH PARAMETER CUACA YANG ANDA INGINKAN",
    {
        reply_markup: {
            inline_keyboard: [
		[{text: "RAINRATE", callback_data: "rainratesiang"}, {text: "SUHU", callback_data: "suhusiang"}, {text: "KELEMBAPAN", callback_data: "kelembapansiang"}],
                [{text: "CONTOH TAFOR", callback_data: "cthtafor"}],
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})

///////////////////////////////////////////
// ACTION UNTUK TAFOR PAGI
///////////////////////////////////////////
bot.action('rainrate', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI PRAKIRAAN RAINRATE TIAP-TIAP JAM')
    for (const tgl1 in jamm) {  
        ctx.replyWithPhoto(
            {
                source: download('http://web.meteo.bmkg.go.id/media/data/bmkg/mfy/wrf/prakiraan/RAIN/rainrate_wrf10km_sfc_'+tglplus+`${jamm[tgl1]}`+'.png')
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

bot.action('suhu', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI PRAKIRAAN SUHU UDARA')
    for (const tgl1 in jamm) {  
        ctx.replyWithPhoto(
            {
                source: download('http://web.meteo.bmkg.go.id//media/data/bmkg/mfy/ecmwf/prakiraan/Backup/TEMP/temp_ifs0p125_2m_'+tglplus+`${jamm[tgl1]}`+'.png')
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

bot.action('kelembapan', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI PRAKIRAAN KELEMBAPAN UDARA')
    for (const tgl1 in jamm) {  
        ctx.replyWithPhoto(
            {
                source: download('http://web.meteo.bmkg.go.id//media/data/bmkg/mfy/ecmwf/prakiraan/Backup/RH/rh_ifs0p125_2m_'+tglplus+`${jamm[tgl1]}`+'.png')
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

///////////////////////////////////////////
// ACTION UNTUK TAFOR SIANG
///////////////////////////////////////////
bot.action('rainratesiang', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI PRAKIRAAN RAINRATE TIAP-TIAP JAM')
    for (const tglsiang in jamsiang) {  
        ctx.replyWithPhoto(
            {
                source: download('http://web.meteo.bmkg.go.id/media/data/bmkg/mfy/wrf/prakiraan/RAIN/rainrate_wrf10km_sfc_'+ddsiang+`${jamsiang[tglsiang]}`+'.png')
            });
    ctx.replyWithPhoto(
        {
            source: download('http://web.meteo.bmkg.go.id/media/data/bmkg/mfy/wrf/prakiraan/RAIN/rainrate_wrf10km_sfc_'+tglplus+'010000.png')
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

bot.action('suhusiang', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI PRAKIRAAN SUHU UDARA')
    for (const tglsiang in jamsiang) {  
        ctx.replyWithPhoto(
            {
                source: download('http://web.meteo.bmkg.go.id//media/data/bmkg/mfy/ecmwf/prakiraan/Backup/TEMP/temp_ifs0p125_2m_'+ddsiang+`${jamsiang[tglsiang]}`+'.png')
            });
    ctx.replyWithPhoto(
        {
            source: download('http://web.meteo.bmkg.go.id//media/data/bmkg/mfy/ecmwf/prakiraan/Backup/TEMP/temp_ifs0p125_2m_'+tglplus+'010000.png')
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

bot.action('kelembapansiang', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI PRAKIRAAN KELEMBAPAN UDARA')
    for (const tglsiang in jamsiang) {  
        ctx.replyWithPhoto(
            {
                source: download('http://web.meteo.bmkg.go.id//media/data/bmkg/mfy/ecmwf/prakiraan/Backup/RH/rh_ifs0p125_2m_'+ddsiang+`${jamsiang[tglsiang]}`+'.png')
            }),
    ctx.replyWithPhoto(
        {
            source: download('http://web.meteo.bmkg.go.id//media/data/bmkg/mfy/ecmwf/prakiraan/Backup/RH/rh_ifs0p125_2m_'+tglplus+'010000.png')
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


bot.action('cthtafor', (ctx)=>{
    ctx.reply("BERIKUT ADALAH CONTOH LAPORAN TAFOR \n ========================\nTAF WIOP 302300Z\n3100/3112 26003KT 7000 SCT013 TEMPO 3108/3110 FEW012CB SCT013=\n========================\nTAF WIOP 310500Z\nTAF WIOP 310500Z 3106/3118 15003KT 6000 SCT012 TEMPO 3109/3111 FEW011CB SCT012=\n========================\nTAF WIOP 311100Z\n3112/3124 00000KT 8000 SCT013 TEMPO 3112/3115 4000 TSRA FEW011CB BKN012=",
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "MENU UTAMA", callback_data: "menu"}]
            ]
        }
    }) 
})


bot.action('angin', (ctx)=>{
    ctx.reply('BERIKUT ADALAH INFORMASI STREAMLINE ANGIN')
    ctx.replyWithPhoto(
        {
            source: download('http://web.meteo.bmkg.go.id//media/data/bmkg/Angin3000ft/Streamline_'+tglplus+jam+'.jpg')
        },
	    console.log('http://web.meteo.bmkg.go.id//media/data/bmkg/Angin3000ft/Streamline_'+tglplus+jam+'.jpg'),
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
bot.launch()
