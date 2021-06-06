const Discord = require("discord.js")

module.exports = {
  name:'nhentai',
  category:'nsfw',
  description:'Baca nhentai',
  usage:'nhentai <kode nuklir>',
  aliases:['nh'],
  cooldown:1000,
  run: async(client, message, args) => {
    if (!message.channel.nsfw) return;
    try {
        let query = args.join(' ');
        if (!query) return message.reply('masukin keyword yang mau dicari dulu, baka!');
        
        await client.readernh.getReadWithID(query, message);

    } catch (error) {
        return message.reply("Kode nuklir macem apa itu? Ngempos gan!");
        // Restart the bot as usual. 
    }
  }
};