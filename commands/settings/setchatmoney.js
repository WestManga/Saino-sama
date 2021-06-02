const Discord = require("discord.js");
const { COLOR } = process.env;

module.exports = {
  name: "setchatmoney",
  category: "settings",
  description: "Setting uang yang akan didapatkan user",
  usage: "<min or max> <nominal>",
  aliases: ["scm"],
  cooldown: 1000,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== process.env.OWNER)
      return message.channel.send("This is owner only command.");
    if (!args[0])
      return message.reply(
        "Please specify a agrument. Agrument is `min` or `max`"
      );
    if (!args[1]) return message.channel.send("Please Enter Valid Number");
    if (args[1] < 1)
      return message.channel.send("You Need To Set Fined More Than 1");
    if (isNaN(args[1])) return message.channel.send("Thats Not A Number -_-");

    let data = await Guild.findOne({
      guildID: message.guild.id,
    });

    const avatar = message.author.displayAvatarURL({ size: 4096, dynamic: true });
    const modlog = client.channels.cache.get(data.modlogChannel);

    if (args[0].toLowerCase() === "min") {
      let e = new Discord.MessageEmbed()
        .setDescription(`Successfully set chat money minimum Rp. ${args[1]}`)
        .setTimestamp(new Date())
        .setColor(COLOR);
      message.channel
        .send({ embed: e })
        .then((d) => d.delete({ timeout: 10000 }));

      let reportembed = new Discord.MessageEmbed()
        .setAuthor("New Value Chat Money!", `${avatar}`)
        .setDescription(`**${message.author.username}** changed chat money minimum!`)
        .addField('<a:loading:831609899548803074> New value minimum chat money', `Rp. ${args[1]}`)
        .setColor(COLOR)
        .setTimestamp(new Date());
      modlog.send({ embed: reportembed });

      data.money.min = args[1];
      data.save();
    } else if (args[0].toLowerCase() === "max") {
      let e = new Discord.MessageEmbed()
        .setDescription(`Successfully set chat money maximum Rp. ${args[1]}`)
        .setTimestamp(new Date())
        .setColor(COLOR);
      message.channel
        .send({ embed: e })
        .then((d) => d.delete({ timeout: 10000 }));

      let reportembed = new Discord.MessageEmbed()
        .setAuthor("New Value Chat Money!", `${avatar}`)
        .setDescription(`**${message.author.username}** changed chat money maximum!`)
        .addField('<a:loading:831609899548803074> New value maximum chat money', `Rp. ${args[1]}`)
        .setColor(COLOR)
        .setTimestamp(new Date());
      modlog.send({ embed: reportembed });

      data.money.max = args[1];
      data.save();
    }
  },
};
