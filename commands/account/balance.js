const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const mongoose = require("mongoose");
const thanksSchema = require("../../models/thanks");
const { determineSupporterTitle } = require("../../handlers/profilehelper");
const { COLOR } = process.env;

module.exports = {
  name: "balance",
  aliases: ["bal", "$"],
  category: "account",
  description: "Show User Balance",
  usage: "[mention]",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      message.author ||
      messsage.guild.members.cache.get(args[0]);

    const member = message.guild.member(user);
    let avatar = user.displayAvatarURL({ dynamic: true });
    const nickname = member.nickname;

    if (member.bot) return message.channel.send("Its A Bot -_-");

    let data = await User.findOne({
      guildID: message.guild.id,
      userID: member.id,
    });

    let datat = await thanksSchema.findOne({
      userId: member.id,
      guildId: message.guild.id,
    });

    let guildData = await Guild.findOne({ guildID: message.guild.id });
    if (!data) return client.nodb(member.user);

    const patreonSupporter = determineSupporterTitle(data.account.patreon);

    let inline = true;
    let e = new MessageEmbed()
      .setAuthor(user.tag, avatar)
      .setTitle(`${patreonSupporter}`)
      .setColor(COLOR)
      .addField(
        "<:diamondegg:836507553378730035> Point",
        `${data.point || 0} Points`,
        inline
      )
      .addField(
        "<:wallet:836507553357496321> Money",
        `Rp. ${data.money || 0}`,
        inline
      )
      .addField(
        "<a:bintang:819855110754271252> Thanks",
        `${datat.received || 0} Thanks`,
        inline
      )
      .setTimestamp();
    message.channel.send({ embed: e });
  },
};
