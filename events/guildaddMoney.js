const { MessageEmbed } = require("discord.js");
const client = require("../index");
const User = require("../models/User");
const Guild = require("../models/Guild");
const { determineSupporterTitle } = require("../handlers/profilehelper");

const cooldown = new Set();

function addToCooldown(ID) {
  let cd = Math.floor(Math.random() * (60000 - 120000) + 120000);
  cooldown.add(ID);
  setTimeout(() => {
    cooldown.delete(ID);
  }, cd /* random seconds */);
}

client.on("message", async (message) => {
  try {
    let member = message.author;
    if (!member) {
      return console.log("Unkown member");
    }

    let guild = await Guild.findOne({
      guildID: message.guild.id,
    }).catch((err) => console.log(err));

    let data = await User.findOne({
      guildID: message.guild.id,
      userID: message.author.id,
    }).catch((err) => console.log(err));

    if (!data) return;

    const patreonSupporter = determineSupporterTitle(data.account.patreon);
    if (!patreonSupporter) {
      return console.log("Patreon Supporter not found!");
    }

    if (message.channel.parentID !== guild.categorychatMoney) return;
    if (!cooldown.has(member.id)) {
      addToCooldown(member.id);

      const moneylog = client.channels.cache.get(guild.moneyincomelogChannel);
      const levelup = client.channels.cache.get(guild.levelUpChannel);
      const moneymin = guild.money.min;
      const moneymax = guild.money.max;
      let patreonStatus = data.account.patreon;

      // DUIT + EXP
      let randexp = Math.floor(Math.random() * 10) + 10;
      let rand = Math.floor(Math.random() * (moneymax - moneymin) + moneymin);

      // Patreon Bonus
      if (patreonStatus === "Silver") {
        let rand = Math.floor(
          Math.random() * (moneymax - moneymin) + (moneymin * (1.5 * 100)) / 100
        );
        randexp *= 2;

        data.money += rand;
        data.xp += randexp;
        data.messages++;

        let e = new MessageEmbed()
          .setColor("#99d42c")
          .setTitle("<:update:836111138576007228>︱Balance Update")
          .setDescription(
            `Rank: ${patreonSupporter}\nUser: **${member.username}**\nReceived:  \`Rp.${rand}\`\nGet EXP: \`${randexp}\``
          )
          .setTimestamp();
        moneylog.send({ embed: e });
      } else if (patreonStatus === "Gold") {
        let rand = Math.floor(
          Math.random() * (moneymax - moneymin) + (moneymin * (3 * 100)) / 100
        );
        randexp *= 4;

        data.money += rand;
        data.xp += randexp;
        data.messages++;

        let e = new MessageEmbed()
          .setColor("#99d42c")
          .setTitle("<:update:836111138576007228>︱Balance Update")
          .setDescription(
            `Rank: ${patreonSupporter}\nUser: **${member.username}**\nReceived:  \`Rp.${rand}\`\nGet EXP: \`${randexp}\``
          )
          .setTimestamp();
        moneylog.send({ embed: e });
      } else if (patreonStatus === "Platinum") {
        let rand = Math.floor(
          Math.random() * (moneymax - moneymin) + (moneymin * (5 * 100)) / 100
        );
        randexp *= 4;

        data.money += rand;
        data.xp += randexp;
        data.messages++;

        let e = new MessageEmbed()
          .setColor("#99d42c")
          .setTitle("<:update:836111138576007228>︱Balance Update")
          .setDescription(
            `Rank: ${patreonSupporter}\nUser: **${member.username}**\nReceived:  \`Rp.${rand}\`\nGet EXP: \`${randexp}\``
          )
          .setTimestamp();
        moneylog.send({ embed: e });
      } else if (patreonStatus === "Bronze") {
        data.money += rand;
        data.xp += randexp;
        data.messages++;

        let e = new MessageEmbed()
          .setColor("#99d42c")
          .setTitle("<:update:836111138576007228>︱Balance Update")
          .setDescription(
            `Rank: ${patreonSupporter}\nUser: **${member.username}**\nReceived:  \`Rp.${rand}\`\nGet EXP: \`${randexp}\``
          )
          .setTimestamp();
        moneylog.send({ embed: e });
      } else if (patreonStatus === "") {
        data.money += rand;
        data.xp += randexp;
        data.messages++;

        let e = new MessageEmbed()
          .setColor("#99d42c")
          .setTitle("<:update:836111138576007228>︱Balance Update")
          .setDescription(
            `Rank: ${patreonSupporter}\nUser: **${member.username}**\nReceived:  \`Rp.${rand}\`\nGet EXP: \`${randexp}\``
          )
          .setTimestamp();
        moneylog.send({ embed: e });
      }

      const level = data.level;
      const exp = process.env.UPXP;
      const exprequired = Math.round(level * exp);

      if (data.xp >= exprequired) {
        let uavatar = message.author.avatarURL({ size: 4096 });
        let e = new MessageEmbed()
          .setColor(process.env.COLOR)
          .setThumbnail(uavatar)
          .setDescription(
            `:tada: Congrats ${message.author.username} You Level Up\nYou are now level ${data.level}`
          );
        levelup.send({ message: `<@${message.author.id}>`, embed: e });
        data.xp -= exprequired;
        data.level += 1;
      }
      data.afk = false;
      data.save();
    }
  } catch (err) {
    console.log(err);
    return;
  }
});
