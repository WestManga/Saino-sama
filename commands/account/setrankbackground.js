const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "setrankbackground",
  usage: "<url image>",
  aliases: ["srb"],
  description: "Set Rankcard Background",
  category: "account",
  run: async (client, message, args) => {
    let reason = args.join(" ").slice(0);
    if (!reason) return message.channel.send("Tolong Isi dengan Link URL");
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
      .setDescription(`Set your rankcard background to ${reason}`);
    data.rankcard.background = reason;
    data.save();
    message.channel.send({ embed: e });
  },
};
