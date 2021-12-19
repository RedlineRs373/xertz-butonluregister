const Discord = require('discord.js');
const db = require('quick.db');
exports.run = function(client, message, args) {
  
// RedSton Youtube Kanalına ait KAYIT bot altyapısı
  
let erkek = db.fetch(`erkek_kayıt`)
if (erkek === null) erkek = 0 || "Erkek Kayıt Olan Yok";
let kız = db.fetch(`kız_kayıt`)
if (kız === null) kız = 0 || "Kız Kayıt Olan Yok";

  
var embed = new Discord.MessageEmbed()
  .addField(`Erkek Kayıt Olan:`,`${erkek}`)
.addField(`Kız Kayıt Olan:`,`${kız}`)
  .setColor("#ffc700")
  message.channel.send(embed)
}

// RedSton Youtube Kanalına ait KAYIT bot altyapısı

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kayıt'
};