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
        let type = args[0];
        if (!type) {
          let embed = new Discord.MessageEmbed()
          .setColor(process.env.COLOR)
          .setDescription('Gunakan tambahan s untuk mencari..')
          let warning = await message.channel.send({embed: embed});
          warning.delete({ timeout: 5000 });
        }
        
        if (type.toLowerCase() === 'popular') {
          await client.westmanga.getPopular(message);
        } else
        if (type.toLowerCase() === 'lastpjupdate', 'lastpj') {
          await client.westmanga.getPJUpdate(message);
        } else
        if (type.toLowerCase() === 'search', 's') {
          let query = args.slice(1).join(' ');
          if (!query) return message.reply('masukin keyword yang mau dicari dulu, baka!');

          await client.westmanga.getSearch(query, message);
        }
    } catch (error) {
        return console.log(error);
        // Restart the bot as usual. 
    }
  }
};