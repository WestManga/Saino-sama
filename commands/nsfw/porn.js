const Discord = require('discord.js');
const scathach = require('scathach-api')
const { nsfw } = new scathach()

module.exports = {
  name:'porn',
  category:'nsfw',
  description:'',
  usage:'porn',
  aliases:['bokep'],
  cooldown:10,
  run: async(client, message, args) => {
    if (!message.channel.nsfw) return;
    try {
      rhentai = await nsfw.gif()
      let embed = new Discord.MessageEmbed()
        .setTitle('CROTT')
        .setColor('#985ce7')
        .setImage(rhentai.url)
  
      message.channel.send(embed)
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
      // Restart the bot as usual.
    }
  }
};