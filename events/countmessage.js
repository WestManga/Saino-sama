const { MessageEmbed } = require("discord.js");
const client = require("../index");
const User = require("../models/countmessages");
const Guild = require("../models/Guild");

const cooldown = new Set();

function addToCooldown(ID) {
  let cd = Math.floor(Math.random() * (10 - 10) + 10);
  cooldown.add(ID);
  setTimeout(() => {
    cooldown.delete(ID);
  }, cd /* random seconds */);
}

client.on("message", async (message) => {
  try {
    let author = message.guild.members.cache.get(message.author.id);
    if (!author) {
      return console.log("Unkown member");
    }

    let member = message.author;

    let guild = await Guild.findOne({
        guildID: message.guild.id,
    }).catch((err) => console.log(err));

    let data = await User.findOne({
        guildId: message.guild.id,
        userId: message.author.id,
    }).catch((err) => console.log(err));

    if (!data) return;

    const messagenow = data.message.now;
    const messagemax = data.message.max;

    if (message.channel.parentID !== guild.categorychatMoney) return;
    if (!cooldown.has(member.id)) {
      addToCooldown(member.id);

      // Penambahan message
      data.message.now++;
      data.save();
    }

    if (messagenow >= messagemax) {
        let notif = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(
            `:tada: Congrats ${message.author.username} Kamu telah menyelesaikan ${messagemax} message!`
        )
        author.send({ embed: notif })

        await User.findOne({ guildId: message.guild.id, userId: message.author.id, }).remove().exec();
      }
  } catch (err) {
    console.log(err);
    return;
  }
});
