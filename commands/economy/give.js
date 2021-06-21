const Discord = require("discord.js");
const dbuser = require('../../models/User');

module.exports = {
  name: "give",
  category: "economy",
  description: "Memberikan uang kepada member lain",
  usage: "<member> <amount>",
  aliases: ["g"],
  cooldown: 1000,
  run: async (client, message, args) => {
    let author = message.author;
    let avatar = author.displayAvatarURL({ size: 4096, dynamic: true });

    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!target)
      return message.channel
        .send("Member is not found.")
        .then((m) => m.delete({ timeout: 5000 }));

    if (author.userID == target.id)
      return message.channel.send("How Is That Possible?");
    if (target.user.bot) return message.channel.send("Its A Bot -_-");

    try {
      let dataguild = await Guild.findOne({
        guildID: message.guild.id,
      });

      const moneylog = client.channels.cache.get(dataguild.moneylogChannel);

      if (dataguild.active.give === false) {
        message.delete();
        return message.channel
          .send(
            "Saat ini transfer uang kesesama member sedang didisable\nKamu dapat kontak admin untuk menanyakan kapan akan dibuka kembali!"
          )
          .then((m) => m.delete({ timeout: 10000 }));
      }

      let nominal = args[1];
      if (!nominal) {
          return message.channel
          .send("Kamu harus mengisi nominal transfer!")
          .then((m) => m.delete({ timeout: 10000 }));
      }
      if (isNaN(nominal))
        return message.channel
          .send("Kamu harus memasukan nominal dalam angka!")
          .then((m) => m.delete({ timeout: 10000 }));

      dbuser.findOne({ guildID: message.guild.id, userID: message.author.id}, async(err, data) => {
        if(err) throw err;
        if(!data) {
            message.channel.send('This account not have data on database!');
            return;
        }
        const saldoku = data.money;
        if (saldoku < nominal) {
        message.channel
          .send("Saldo kamu kurang!")
          .then((m) => m.delete({ timeout: 10000 }));
        return;
      }
        data.money -= nominal;
        data.save();
      });

      let dtarget = await User.findOne({
          guildID: message.guild.id,
          userID: target.user.id,
      });

      if (!dtarget) {
          message.channel.send('User target not have data on database!');
          return;
      }

      const pajak = Math.floor(nominal * 2.5 / 100);
      const amount = Math.floor(nominal - pajak);

      dtarget.money += amount;
      dtarget.save();

      let notifembed = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setAuthor(author.tag, avatar)
        .setTitle("<:transfer:856510446332674098>︱Transfer Money")
        .setDescription(
          `**Pemberi:** ${author.username}\n**Penerima:** ${target.user.username}\n**Jumlah:** Rp.${amount}\nPajak: ${pajak}`
        )
        .setTimestamp();
      moneylog.send({ embed: notifembed });

      let embed = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setAuthor(author.tag, avatar)
        .setTitle("<:transfer:856510446332674098>︱Transfer Money")
        .setDescription(
          `Berhasil mememberikan Rp.${amount} kepada ${target.user.username}\n`
        )
        .setFooter(
            `Pajak ditanggung penerima sebesar Rp.${pajak}`
            )
        .setTimestamp();
      message.channel.send(embed);

      target.send(
        new Discord.MessageEmbed()
          .setColor(process.env.COLOR)
          .setAuthor(author.tag, avatar)
          .setTitle("<:transfer:856510446332674098>︱Transfer Money")
          .setDescription(
            `Kamu telah mendapatkan Rp.${nominal}
            Diberikan oleh ${author.username}
            Jumlah tersebut akan dikurangi pajak sebesar Rp.${pajak}
            Uang yang kamu dapatkan sebesar Rp.${amount}`
          )
          .setTimestamp()
      );
    } catch (err) {
      console.log(err);
      message.channel.send("Upps error!");
      return;
    }
  },
};
