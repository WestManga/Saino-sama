const Discord = require("discord.js")

module.exports = {
  name:'kusonime',
  category:'animanga',
  description:'Mencari anime di website Kusonime',
  usage:'kusonime <judul>',
  aliases:['kuso'],
  cooldown:10,
  run: async(client, message, args) => {
    try {
        let query = args.join(' ');
        if (!query) return message.reply('masukin dulu!');

        if(query.startsWith('https')) await client.kusonime.getDetail(query.replace('https://kusonime.com/', ''), message);
            else await client.kusonime.getBySearch(query, message);
    } catch (error) {
        return console.log(error);
        // Restart the bot as usual. 
    }
  }
};