const { MessageEmbed } = require("discord.js");
const db = require("../../models/convert");
const moment = require("moment");

module.exports = {
  name: "convertlist",
  category: "account",
  description: "Check your list converts!",
  usage: "<user>",
  aliases: [""],
  cooldown: 1000,
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      message.author ||
      messsage.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel
        .send("User not found.")
        .then((m) => m.delete({ timeout: 5000 }));
    db.findOne(
      { guildID: message.guild.id, userID: user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          let reqdate = moment
            .utc(data.tanggalReq)
            .format("dddd, MMMM Do YYYY");
          message.channel.send(
            new MessageEmbed()
              .setTitle(`${user.username} Convert List`)
              .setDescription(
                data.convertdata.map(
                  (w, i) =>
                    `\`${i + 1}\` | Tujuan : ${w.tujuan}\nNominal : ${
                      w.nominal
                    }\nStatus : ${w.status || `Pending`}\nTanggal : ${reqdate}`
                )
              )
              .setColor("BLUE")
              .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          );
        } else {
          message.channel.send(
            new MessageEmbed()
              .setTitle(`${user.username} Convert List`)
              .setDescription("Kamu tidak mempunyai permintaan request convert untuk saat ini")
              .setColor("BLUE")
              .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          );
        }
      }
    );
  },
};
