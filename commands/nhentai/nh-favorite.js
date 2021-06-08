const Discord = require("discord.js");

module.exports = {
  name: "nh-favorite",
  category: "nhentai",
  description: "nhentai favorite list",
  usage: "<add/remove>",
  aliases: ["nh-fav"],
  cooldown: 1000,
  run: async (client, msg, args) => {
    if (!msg.channel.nsfw || msg.channel.nsfw == false)
      return msg.channel
        .send(`NSFW channel please.`)
        .then((msg) => msg.delete({ timeout: 5000 }));
    client.channels.fetch(msg.channel.id);

    let nick = msg.member.nickname || msg.author.username;
    if (args[0] == "add") {
      let bookId = args[1];
      let res = await client.hentaiembed.getById(bookId);
      let favorite = await client.hentaifavorite.getUserFavoritID(msg.author.id);
      favorite = favorite.find((x) => x.bookID == bookId);
      if (!favorite) {
        client.hentaifavorite.setUserFavoritID(msg.author.id, res.id);
        return msg.channel
          .send(
            `${nick} you have added **${res.title.pretty}** to **Favorite**`
          )
          .then((msg) => msg.delete({ timeout: 7000 }));
      }
      return msg.channel
        .send(`${nick} this book ID has already in your **Favorite** list`)
        .then((msg) => msg.delete({ timeout: 7000 }));
    }
    if (args[0] == "delete") {
      let bookId = args[1];
      let res = await client.hentaiembed.getById(bookId);
      let favorite = await client.hentaifavorite.getUserFavoritID(msg.author.id);
      favorite = favorite.find((x) => x.bookID == bookId);
      if (!favorite) {
        return msg.channel
          .send(`${nick} you don't have doujin with that ID`)
          .then((msg) => msg.delete({ timeout: 7000 }));
      }

      client.hentaifavorite.deleteUserFavoritID(msg.author.id, bookId);
      return msg.channel
        .send(
          `${nick} your favorite of **${res.title.pretty}** has been deleted from **Favorite**`
        )
        .then((msg) => msg.delete({ timeout: 5000 }));
    }
    if (args[0] == "look") {
      try {
        var member =
          msg.mentions.members.first() || msg.guild.members.get(args[1]);
        await client.hentaifavorite.favoriteEmbed(msg, member.id);
      } catch (e) {
        if (e.message == "Cannot read property 'title' of undefined") {
          return msg.channel
            .send(`${member.user.username} don't have any doujin ID yet`)
            .then((msg) => msg.delete({ timeout: 7000 }));
        }
      }
    }
    if (!args[0]) {
      try {
        await client.hentaifavorite.favoriteEmbed(msg, msg.author.id);
      } catch (e) {
        if (e.message == "Cannot read property 'title' of undefined") {
          return msg.channel
            .send(`${nick} you don't have any doujin ID yet`)
            .then((msg) => msg.delete({ timeout: 7000 }));
        }
      }
    }
  },
};
