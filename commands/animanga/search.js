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
        return message.channel.send(
          "Kamu wajib masukin type.. mau anime atau manga?"
        );
      }

      if (type.toLowerCase() === "manga") {
        let query = args.slice(1).join(" ");
        if (!query.length)
          return message.reply("masukin keyword yang mau dicari dulu, baka!");

        await client.malmanga.getSearchMangaGenre(query, message);
      } else
      if (type.toLowerCase() === "anime") {
        return message.reply("Belom jadi coy!");
      }
    } catch (error) {
      return console.log(error);
      // Restart the bot as usual.
    }
  },
};
