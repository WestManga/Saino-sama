const Discord = require('discord.js');
const neko = require('nekos.life')
const { nsfw } = new neko()

module.exports = {
  name:'neko',
  category:'nsfw',
  description:'',
  usage:'neko',
  aliases:['kitsune'],
  cooldown:10,
  run: async(client, message, args) => {
    if (!message.channel.nsfw) return;
    try {
      const genre = [nsfw.neko(), nsfw.nekoGif(), nsfw.kemonomimi(), nsfw.eroKemonomimi(), nsfw.kitsune(), nsfw.eroKitsune(), nsfw.holo()];
      const random = genre[Math.floor(Math.random() * genre.length)];
      rhentai = await random
      let embed = new Discord.MessageEmbed()
        .setTitle('( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)')
        .setColor('#985ce7')
        .setImage(rhentai.url)
  
      message.channel.send(embed)
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
      // Restart the bot as usual.
    }
  }
};