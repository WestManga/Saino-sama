const Discord = require("discord.js")

module.exports = {
  name:'about',
  description:'Menampilkan tentang BOT',
  usage:'about',
  aliases:['info'],
  cooldown:10,
  run: async(client, message, args) => {
    const roleColor =
        message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;
    let ava = client.user.displayAvatarURL();
    let nama = client.user.username
    let botembed = new Discord.MessageEmbed()
      .setColor(roleColor)
      .setThumbnail(ava)
      .addField("Nama", nama)
      .addField("Gender", "Male")
      .addField("Pemilik", "Watambeee")
      .addField("Bahasa", "Discord.JS dengan NodeJS")
      .addField("Motto", "Eue everytime")
      .addField("Dikembangkan oleh", "Watambeee for WestManga Discord")
      .addField("Source", "[Github](https://github.com/mhazm/Saino-sama)")
      .setFooter("2021 © WestManga.Info")
      .setAuthor(message.guild.name, message.guild.iconURL())
    return message.channel.send(botembed);
  }
};