const Discord = require("discord.js")
const thankslb = require('../../models/thanks-lb')

module.exports = {
  name:'thanks-lb',
  category:'info',
  description:'Setup thanks leaderboard',
  usage:'',
  aliases:['tlb'],
  cooldown:1000,
  run: async(client, message, args) => {
    let author = message.guild.members.cache.get(message.author.id);
    if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send("You dont have permission for used this command!");

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