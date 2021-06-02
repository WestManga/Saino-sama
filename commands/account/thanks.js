const { MessageEmbed, Message, Client } = require("discord.js");
const thanksSchema = require("../../models/thanks");
const { COLOR } = process.env;
const client = require("nekos.life");
const { sfw } = new client();

module.exports = {
  name: "thanks",
  category: "account",
  description: "Memberikan terimakasih karena telah membantu",
  usage: "<username target>",
  aliases: ["thx"],
  cooldown: 10,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    let pat = await sfw.pat();
    const target = message.guild.member(message.mentions.users.first());
    if (!target) {
      message.reply("Please mention someone to thank");
      return;
    }

    const { guild } = message;
    const guildId = guild.id;
    const targetId = target.id;
    const authorId = message.author.id;
    const now = new Date();

    if (targetId === authorId)
      return message.reply("You cannot thank yourself");
    if (target.user.bot) return message.channel.send("Its A Bot -_-");

    const authorData = await thanksSchema.findOne({
      userId: authorId,
      guildId,
    });

    if (authorData && authorData.lastGave) {
      const then = new Date(authorData.lastGave);

      const diff = now.getTime() - then.getTime();
      const diffHours = Math.round(diff / (1000 * 60 * 60));

      const hours = 6;

      //embed notif
      let doneEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          `You have already thanked someone with the last ${hours} hours`
        );
      if (diffHours <= hours) {
        message.channel.send(doneEmbed);
        return;
      }
    }

    // Update lastgave
    await thanksSchema.findOneAndUpdate(
      {
        userId: authorId,
        guildId,
      },
      {
        userId: authorId,
        guildId,
        lastGave: now,
      },
      {
        upsert: true,
      }
    );

    // Penambahan thanks kepada target
    const result = await thanksSchema.findOneAndUpdate(
      {
        userId: targetId,
        guildId,
      },
      {
        userId: targetId,
        guildId,
        $inc: {
          received: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    const amount = result.received;

    let giveEmbed = new MessageEmbed()
      .setColor(COLOR)
      .setImage(pat.url)
      .setDescription(
        `You have thanked to <@${targetId}>! They now have ${amount} thanks.`
      );
    message.channel.send(giveEmbed);
  },
};
