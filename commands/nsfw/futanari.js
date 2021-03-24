const Discord = require('discord.js');
const neko = require('nekos.life')
const { nsfw } = new neko()

module.exports = {
  name:'futanari',
  category:'nsfw',
  description:'',
  usage:'',
  aliases:['futa'],
  cooldown:10,
  run: async(client, message, args) => {
    if (!message.channel.nsfw) return;
    try {
      rhentai = await nsfw.futanari()
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