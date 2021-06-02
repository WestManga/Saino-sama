const Discord = require("discord.js");
const canvacord = require("canvacord");
const User = require("../../models/User");
const { COLOR } = process.env;

module.exports = {
  name: "exp",
  category: "test",
  description: "checkuser exp",
  usage: "<user>",
  cooldown: 10,
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      message.author ||
      messsage.guild.members.cache.get(args[0]);

    const member = message.guild.member(user);
    let data = await User.findOne({
      guildID: message.guild.id,
      userID: member.id,
    });
    if (!data) return client.nodb(member.user);

    const nickname = member.nickname;
    let avatar = user.avatarURL({ dynamic: false, format: "png" });

    const level = data.level;
    const upxp = process.env.UPXP;
    const expre = Math.round(level * upxp);

    const rank = new canvacord.Rank()
      .setAvatar(avatar)
      .setCurrentXP(data.xp, `#${data.rankcard.color || FFFFFF}`)
      .setRequiredXP(expre, `#${data.rankcard.color || FFFFFF}`)
      .setLevel(level)
      .setStatus(user.presence.status)
      .setProgressBar(`#${data.rankcard.color || FFFFFF}`)
      .setLevelColor("TEXT", `#${data.rankcard.color || FFFFFF}`)
      .setBackground("IMAGE", `${data.rankcard.background}`)
      .setUsername(user.username, `#${data.rankcard.color || FFFFFF}`)
      .setRank(1, "RANK", false)
      .registerFonts()
      .setDiscriminator(
        user.discriminator,
        `#${data.rankcard.color || FFFFFF}`
      );

    rank.build().then((data) => {
      const attachment = new Discord.MessageAttachment(data, "RankCard.png");
      message.channel.send(attachment);
    });
  },
};
