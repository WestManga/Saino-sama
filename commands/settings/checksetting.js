const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require("../../models/Guild");
const { COLOR } = process.env;

module.exports = {
  name:'checksetting',
  category:'settings',
  description:'Mengecheck setting di guild',
  usage:'',
  aliases:['checkguild','setcheck'],
  cooldown:10,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;

    Schema.findOne({ guildID: message.guild.id }, async (err, data) => {
        if(!data) return message.reply('this guild not have any data');

        const guildname = message.member.guild.name
        const welcomeChannel = client.channels.cache.get(data.welcomeChannel);
        const levelup = client.channels.cache.get(data.levelUpChannel);
        const modlog = client.channels.cache.get(data.modlogChannel);
        const moneylog = client.channels.cache.get(data.moneylogChannel);
        const moneyincomelog = client.channels.cache.get(data.moneyincomelogChannel);

        let e = new MessageEmbed()
        .setTitle(`There is channel setting on this server ${guildname}`)
        .setDescription('If you want setting channel, you can use command `setlevelup`, `setmodlog`, `setmoneylog` and `setwelcome`\nIf you need more help for setting channel, you can use `help setwelcome` or other command.')
        .setColor(COLOR)
        .addField("Fined Min", data.fined.min, true)
        .addField("Fined Max", data.fined.max, true)
        .addField("Money Income Min", data.money.min, true)
        .addField("Money Income Max", data.money.max, true)
        .addField("Welcome Channel", welcomeChannel)
        .addField("Levelup Channel", levelup)
        .addField("ModLog Channel", modlog)
        .addField("MoneyLog Channel", moneylog)
        .addField("Money Income Log", moneyincomelog)
        message.channel.send({embed: e});
    })
  }
};