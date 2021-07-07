const Discord = require("discord.js")
const thankslb = require('../../models/thanks-lb')

module.exports = {
  name:'thanks-lb',
  category:'info',
  description:'Setup thanks leaderboard',
  usage:'',
  aliases:['tlb'],
  cooldown:1000,
  run: async(message) => {
    let author = message.author.id;
    if (!author.hasPermission("ADMINISTRATOR")) {
        return message.reply('Siapa anda?');
    }

    const { guild, channel } = message;
    const guildId = guild.id;
    const channelId = channel.id;

    await thankslb.findOneAndUpdate({
        _id: guildId,
        channelId
    }, {
        _id: guildId,
        channelId
    }, {
        upsert: true
    })

    message.reply('Thanks leaderboard succesfuly setup!')
    }
};