const Discord = require("discord.js")

module.exports = {
  name:'horoskop',
  category:'extra',
  description:'Melihat horoskopmu hari ini',
  usage:'<nama horoskop>',
  aliases:['horo', 'zodiac'],
  cooldown:10,
  run: async(client, message, args) => {
    try {
        let query = args.join(' ');
        if (!query) return message.reply('masukin keyword yang mau dicari dulu, baka!');

        await client.horoskop.getDetailToday(query, message);
    } catch (error) {
        return console.log(error);
        // Restart the bot as usual. 
    }
  }
};