const Discord = require("discord.js")

module.exports = {
  name:'westmanga',
  category:'animanga',
  description:'Mencari Manga di Website WestManga.Info',
  usage:'westmanga <judul>',
  aliases:['wm'],
  cooldown:10,
  run: async(client, message, args) => {
    try {
        let query = args.join(' ');
        if (!query) return message.reply('masukin keyword yang mau dicari dulu, baka!');

        await client.westmanga.getSearch(query, message);
    } catch (error) {
        return console.log(error);
        // Restart the bot as usual. 
    }
  }
};