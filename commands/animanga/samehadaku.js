const Discord = require("discord.js")

module.exports = {
  name:'samehadaku',
  category:'animanga',
  description:'Mencari anime di Samehadaku',
  usage:'samehadaku <judul>',
  aliases:['same', 'sh'],
  cooldown:10,
  run: async(client, message, args) => {
        try {
            let query = args.join(' ');
            if (!query) return message.reply('masukin dulu!');

            await client.samehadaku.getSearch(query, message);
        } catch (error) {
            return console.log(error);
        // Restart the bot as usual. 
        }
    }
};

