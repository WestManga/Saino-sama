const Discord = require("discord.js");
const Clan = require("../../models/clan");

const yes = ["yes", "y", "ye", "yeah", "yup", "yea", "ya"];
const no = [
  "no",
  "n",
  "nah",
  "nope",
  "nop",
  "enggak",
  "ngak",
  "nggak",
  "engga",
];

module.exports = {
  name: "clan-invite",
  category: "clan",
  description: "Invite member to clan",
  usage: "",
  aliases: [""],
  cooldown: 1000,
  run: async (client, message, args) => {
    const target =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);

    if (!target) {
      return message.reply(
        "Kamu harus mention seorang member untuk diundang.."
      );
    }

    // Check Author Clan //
    try {
      let dba = await Clan.findOne({ "member.userID": message.author.id });
      if (dba.userID !== message.author.id) {
        return message.reply("Kamu bukan ketua clan!");
      }
    } catch (err) {
      console.log(err);
      return message.channel.send("Ups error");
    }

    try {
      Clan.find({ "member.userID": target.id }, async (err, res) => {
        if (err) throw err;
        if (!res) {
          message.reply(
            `User ${target.username} sudah bergabung dengan sebuah clan lain..`
          );
        }
      });
    } catch (err) {
      console.log(err);
      return message.channel.send("Ups error");
    }

    // INVITE EMBED //
    let embed = new Discord.MessageEmbed()
      .setColor(dba.info.warna)
      .setTitle(`${dba.clanname} Invite!`)
      .setDescription(
        `Hi ${target} kamu telah diundang untuk bergabung dengan clan ${dba.clanname}\nApakah kamu ingin?`
      )
      .setThumbnail(dba.info.logo);
    let embed_send = await message.channel.send(embed);
    let to_target = await message.channel.send(
      `Hey ${target} kamu mau gabung ga?\nBalas dengan yes/no`
    );

    // VERIFY USER TARGET //
    let targets = target.id;
    const filter = (res) => {
      const value = res.content.toLowerCase();
      return (
        res.author.id === targets && (yes.includes(value) || no.includes(value))
      );
    };

    let response = await message.channel
      .awaitMessages(filter, {
        max: 1,
        time: 30000,
        errors: ["time"],
      })
      .catch((err) => {
        return message
          .reply("Waktu habis!\nSilahkan undang ulang..")
          .then((t) => {
            t.delete({ timeout: 5000 });
            embed_send.delete();
            to_target.delete();
          });
      });

    // FINAL DECISION //
    const choice = response.first().content.toLowerCase();
    if (yes.includes(choice)) {
      try {
        Clan.findOne({ userID: message.author.id }, async (err, data) => {
          if (err) throw err;
          if (!data) {
            return message.channel.send("Error!");
          } else {
            const obj = {
              userID: target.id,
              username: target.username,
              Rank: "Member",
            };
            data.member.push(obj);
          }
          data.save();
        });
      } catch (err) {
        console.log(err);
        return;
      }
    }
    if (no.includes(choice)) {
      return message.channel.send("OK");
    }
  },
};
