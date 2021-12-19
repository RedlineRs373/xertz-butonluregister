const ayarlar = require("./ayarlar.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const moment = require("moment");
const disbut = require('discord-buttons')
disbut(client);
const app = express();
const db = require('quick.db');

const fs = require("fs");
// RedSton Youtube Kanalına ait KAYIT bot altyapısı
//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("Xertz Code Discord Bot Altyapısı");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});
// RedSton Youtube Kanalına ait KAYIT bot altyapısı
//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`Xertz Code Discord Bot Altyapısı BOT AKTİF`);
});

client.login(ayarlar.token);
// RedSton Youtube Kanalına ait KAYIT bot altyapısı
client.on("ready", async () => {
  console.log("Bot Başarıyla Ses Kanalına Bağlandı")
  let botVoiceChannel = client.channels.cache.get("920745379933323316");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanırken bir hata oluştu!"));
});


  let erkek = "920684566748991549" // ERKEK ROL ID
  let kız = "920684611602886666" // KIZ ROL ID
  let kayıtsız = "920685005250904095" // SUNUCUYA GELENE OTO VERILECEK ROL ID
  let sunucu = "918394395814953010" // SUNUCU ID
  let hosgeldin = "920683351554265138" // HOŞGELDİN KANAL ID 
  
//------------------OTOMESAJ
client.on('guildMemberAdd', async member  => {
  if(member.guild.id!= sunucu) return false;
 let member2 = member.user 
 let zaman = new Date().getTime() - member2.createdAt.getTime()
 var user = member2 
 var ardademrzaman = [];
 if(zaman < 172800000) {
 ardademrzaman = `Hesap Yeni Açılmış`
 } else {
 ardademrzaman = `Hesap Yeni Açılmamış`}require("moment-duration-format");
   let zaman1 = new Date().getTime() - user.createdAt.getTime()
   const gecen = moment.duration(zaman1).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    const ardademrembed = new Discord.MessageEmbed()
    .setColor('#efff00')
     .setDescription(`**Hoş Geldin:** ${member}\n**Discord'a Kayıt Olma Süresi:** ${gecen}\n**Hesap Yeni Mi?:** ${ardademrzaman}`)
 client.channels.cache.get(hosgeldin).send(ardademrembed)
   
           });


//------------------OTOROL
client.on('guildMemberAdd', member => {
var role = member.guild.roles.cache.find(role => role.id == kayıtsız)
member.roles.add(role);
});
// RedSton Youtube Kanalına ait KAYIT bot altyapısı

  
client.on('clickButton', (button) => {
  
  if (button.id === 'ardademrerkek') {
    db.add(`erkek_kayıt`,1)
     button.clicker.member.roles.add(erkek); 
    button.clicker.member.roles.remove(kayıtsız);
    button.clicker.member.roles.remove(kız);
  }
    if (button.id === 'ardademrkız') {
    db.add(`kız_kayıt`,1)
     button.clicker.member.roles.add(kız); 
    button.clicker.member.roles.remove(kayıtsız); 
       button.clicker.member.roles.remove(erkek); 
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="ardademrerkek"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Seni sunucumuza Erkek Üye olarak kayıt ettim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 

   };
   
      if(interaction.data.custom_id=="ardademrkız"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Seni sunucumuza Kız Üye olarak kayıt ettim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 
   };
    });
  });