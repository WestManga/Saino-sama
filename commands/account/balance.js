const { MessageEmbed } = require("discord.js");
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

    if (member.bot) return message.channel.send("Its A Bot -_-");

    const data = await User.findOne({
      guildID: message.guild.id,
      userID: member.id,
    });

    const datathanks = await Thanks.findOne({
      userId: member.id,
      guildId: message.guild.id,
    });

    if (!data) return client.nodb(member.user);

    const patreonSupporter = determineSupporterTitle(data.account.patreon);

    const mybalance = data.money;
    const mythanks = datathanks.received;

    const inline = true;

      const embedbalance = new MessageEmbed()
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
          `Rp. ${data.money}`,
          inline
        )
        .addField(
          "<a:bintang:819855110754271252> Thanks",
          `${datathanks.received || 0} Thanks`,
          inline
        )
        .setTimestamp();

    if (!mybalance) return message.channel.send("You dont have a balance!");
    else if (mybalance) {
      message.channel.send({ embed: embedbalance });
    }
  },
};