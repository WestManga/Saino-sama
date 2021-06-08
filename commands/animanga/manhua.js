const Discord = require("discord.js")

module.exports = {
  name:'manhua',
  category:'animanga',
  description:'Mencari Manhua di myanimelist',
  usage:'<judul>',
  cooldown:1000,
  run: async(client, message, args) => {
    try {
        let query = args.join(' ');
        if (!query) return message.reply('masukin keyword yang mau dicari dulu, baka!');

        await client.malmanga.getSearchManhua(query, message);
    } catch (error) {
        return console.log(error);
        // Restart the bot as usual. 
    }
  }
};