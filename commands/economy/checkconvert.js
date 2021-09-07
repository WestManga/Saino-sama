const Discord = require("discord.js");
const Guild = require("../../models/Guild");
const { statusPTC } = require("../../handlers/profilehelper");
const { COLOR } = process.env;

module.exports = {
  name:'checkconvert',
  category:'economy',
  description:'Check convert enable or disable and balance convert status',
  usage:'',
  aliases:[''],
  cooldown:1000,
  run: async(client, message, args) => {
    try {
        let dataguild = await Guild.findOne({
            guildID: message.guild.id
        });

        if (!dataguild) {
            return message.channel.send('Error found! Guild not have data!');
        }

        const ptcstatus = statusPTC(dataguild.active.convert);
        const budgetptc = dataguild.budget;

        let info = new Discord.MessageEmbed()
        .setTitle(`<:bmoney:836506631063470090> | Convert Status`)
        .setColor(COLOR)
        .addField('• Status', ptcstatus)
        .addField('• Budget Server', `Rp.${budgetptc}`)
        message.channel.send({ embed: info })
    } catch (err) {
        console.log(err)
        return message.channel.send(`Error found! Please contact admin!`)
    }
  }
};