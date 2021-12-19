
const discord = require('discord.js');
const disbut = require('discord-buttons')
const client = new discord.Client();

exports.run = async (client, message, args) => { 

    let button7 = new disbut.MessageButton()
    .setStyle('blurple') 
    .setLabel('Erkek') 
    .setID('ardademrerkek')

    let button8 = new disbut.MessageButton()
    .setStyle('red') 
    .setLabel('Kız') 
    .setID('ardademrkız')

    message.channel.send(" ", {
        buttons:[
            button7,button8
        ],
        embed:new discord.MessageEmbed().setColor("#3a73ff").setTitle(`Xertz Code - Kayıt Sistemi`).setThumbnail(`https://i.hizliresim.com/jc5koek.png`).setDescription("Kayıt olan herkes kuralları okumuş sayılacaktır.").addField(`Kayıt Bilgi;`,`Aşağıdan cinsiyetinizi seçin ve kayıt olun. `)
    });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıt-mesajı'],
  permLevel: 0
};
 
exports.help = {
  name: 'kayıt-mesajı'
};