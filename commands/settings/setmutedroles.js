const Discord = require("discord.js");
const Guild = require("../../models/Guild");
const { COLOR } = process.env;

module.exports = {
  name:'setmutedroles',
  category:'setting',
  description:'Setting muted roles',
  usage:'<mention roles/roles id>',
  aliases:['setmutedr', 'setmute'],
  cooldown:1000,
  run: async(client, message, args) => {
    let author = message.guild.members.cache.get(message.author.id);
    if (!author.hasPermission('MANAGES_ROLES')) return message.channel.send("You dont have permission for used this command!");
    let roles = message.mentions.roles.first() || message.guild.roles.cache.find(roles => roles.name === args.join(" "));
    if (!args[0]) return message.channel.send("Please mention roles first!");

    // Find Data
    let data = await Guild.findOne({
        guildID: message.guild.id
    });

    //Store Data + Embed
    let e = new Discord.MessageEmbed()
    .setColor(COLOR)
    .setTitle("Set Muted Roles")
    .setDescription(`Succefully set muted role to ${args[0]}`)
    message.channel.send({ embed: e })
    data.mutedRole = roles.id; data.save();
  }
};