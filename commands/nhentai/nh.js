const Discord = require("discord.js");

module.exports = {
  name: "nh",
  category: "test",
  description: "nhentai reader!",
  usage: "<code>",
  cooldown: 1000,
  run: async (client, msg, args) => {
    if (!msg.channel.nsfw)
      return msg.channel
        .send(`NSFW channel please.`)
        .then((msg) => msg.delete({ timeout: 5000 }));
    let nick =
      msg.member.nickname !== null
        ? `${msg.member.nickname}`
        : msg.author.username;
    let id = args[0];
    if (!args[0])
      return msg.channel
        .send(`**${nick}**, please give me the doujin ID`)
        .then((msg) => msg.delete({ timeout: 5000 }));

    try {
      await client.hentaiembed.getInfoEmbed(id, msg);
    } catch (e) {
      if (e.message == "Doujin Not Found") {
        return msg.channel
          .send(`**${nick}**, Kode nuklir lu melempem kaya petasan korek!`)
          .then((msg) => msg.delete({ timeout: 5000 }));
      }
    }
  },
};
