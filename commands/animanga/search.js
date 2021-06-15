const Discord = require("discord.js");

module.exports = {
  name: "search",
  category: "animanga",
  description: "Mencari Manga di myanimelist",
  usage: "<judul>",
  aliases: ["manga-tag", "genre"],
  cooldown: 1000,
  run: async (client, message, args) => {
    try {
      let type = args[0];
      if (!type) {
        let embed = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription("Kamu wajib masukin type.. mau anime atau manga?\nKamu dapat gunakan command `!search manga/anime` untuk melihat semua list genre yang tersedia")
        let warning = await message.channel.send({embed});
        warning.delete({ timeout: 5000 });
        return;
      }

      if (type.toLowerCase() === "manga") {
        let query = args.slice(1).join(" ");
        if (!query.length) {
          await client.malmanga.getSearchMangaGenreList(message);
          return;
        }

        await client.malmanga.getSearchMangaGenre(query, message);
      } else
      if (type.toLowerCase() === "anime") {
        let query = args.slice(1).join(" ");
        if (!query.length) {
          await client.malanime.getSearchAnimeGenreList(message);
          return;
        }

        await client.malanime.getSearchAnimeGenre(query, message);
      }
    } catch (error) {
      return console.log(error);
      // Restart the bot as usual.
    }
  },
};
