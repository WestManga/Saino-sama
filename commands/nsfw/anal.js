const Discord = require('discord.js');
const neko = require('nekos.life')
const { nsfw } = new neko()

module.exports = {
  name:'anal',
  category:'nsfw',
  description:'Menampilkan gambar anal',
  cooldown:10,
  run: async(client, message, args) => {
    if (!message.channel.nsfw) return;
    try {
      rhentai = await nsfw.anal()
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