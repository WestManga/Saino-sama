const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "setrankcolor",
  usage: "FFFFFF",
  aliases: ["src"],
  description:
    "Set Rankcard Color. Cara penggunaannya adalah dengan contoh `k.src FFFFFF`\nKamu bisa cari digoole hex color code",
  category: "account",
  run: async (client, message, args) => {
    let reason = args.join(" ").slice(0);
    if (!reason) return message.channel.send("Tolong Isi warna");
    if (reason.length >= 300)
      return message.channel.send(
        `Unfortunately, I cannot give you such a description. It is ${reason.length} long`
      );
    let data = await User.findOne({
      userID: message.author.id,
      guildID: message.guild.id,
    });

    if (!data) return client.nodb(message.author);

    let e = new MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`Set your rankcard color to ${reason}`);
    data.rankcard.color = reason;
    data.save();
    message.channel.send({ embed: e });
  },
};
