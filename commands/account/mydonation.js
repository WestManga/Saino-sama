const Discord = require("discord.js");
const { determineSupporterTitle } = require("../../handlers/profilehelper");
const { COLOR } = process.env;
const moment = require("moment");

module.exports = {
  name: "mydonation",
  category: "account",
  description: "Melihat sudah berapa banyak kamu donasi",
  usage: "",
  aliases: ["mydon", "donasiku"],
  cooldown: 1000,
  run: async (client, message, args) => {
    await message.delete();
    let user =
      message.mentions.users.first() ||
      message.author ||
      messsage.guild.members.cache.get(args[0]);
    const member = message.guild.member(user);
    if (member.bot) return message.channel.send("Its A Bot -_-");

    let data = await User.findOne({
      guildID: message.guild.id,
      userID: member.id,
    });

    if (!data.donate.lastdonate) {
      return message.channel.send(`Maaf, kamu tidak punya data apapun..`);
    }

    let lastdon = data.donate.lastdonate;
    let lastdonformat = moment.utc(lastdon).format("dddd, MMMM Do YYYY");

    let avatar = user.displayAvatarURL({ dynamic: true });
    const patreonSupporter = determineSupporterTitle(data.account.patreon);

    let inline = true;
    let e = new Discord.MessageEmbed()
      .setAuthor(user.tag, avatar)
      .setTitle(`${patreonSupporter}`)
      .setDescription(
        "Berikut dibawah ini adalah seberapa banyak kamu telah memberikan donasi kepada WestManga"
      )
      .setColor(COLOR)
      .setThumbnail(`https://i.ibb.co/cF5GTmQ/wm-white.png`)
      .addField("🔰 Total Point", `${data.point || 0} Points`)
      .addField("Rupiah", `Rp. ${data.donate.rupiah || 0}`, inline)
      .addField("Anigold", `${data.donate.anigold || 0} Gold`, inline)
      .addField("OwoCash", `${data.donate.owocash || 0} Wcash`, inline)
      .addField("Last Donation", lastdonformat);
    message.channel.send({ embed: e });
  },
};
