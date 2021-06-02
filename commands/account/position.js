const { Client, Message, MessageEmbed } = require("discord.js");
const { COLOR } = process.env;

module.exports = {
  name: "position",
  category: "account",
  description: "Melihat posisi join",
  usage: "<user>",
  aliases: ["jpos"],
  cooldown: 10,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.author ||
      messsage.guild.members.cache.get(args[0]);

    const members = message.guild.members.cache
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .array();

    const position = new Promise((ful) => {
      for (let i = 1; i < members.length + 1; i++) {
        if (members[i - 1].id === member.id) ful(i);
      }
    });

    let pos = new MessageEmbed()
      .setColor(COLOR)
      .setDescription(`**${member}** is Member Number **#${await position}**`);

    message.channel.send({ embed: pos });
  },
};
