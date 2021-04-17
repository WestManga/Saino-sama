const { Client, Message, MessageEmbed } = require("discord.js");
const Guild = require("../../models/Guild");

module.exports = {
  name:'suggestion',
  description:'',
  aliases:['suggest'],
  usage:'<yang ingin disarankan>',
  cooldown:10,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {Sting[]} args 
   */
  run: async(client, message, args) => {
      const suggestionQuery = args.join(" ");
      if(!suggestionQuery) return message.reply('Please specify a suggestion!');

      let data =  await Guild.findOne({
        guildID: message.guild.id
      });

      const suglog = client.channels.cache.get(data.suggestionChannel);
      // kalau channel ngga ada
      if (!suglog)
      return message.channel.send(`There is no channel in this guild which is called \`suggestion\`\nPlease setting first with command `setsugch``);
      message.delete();

      const embed = new MessageEmbed()
      .setAuthor(`${message.author.username} Suggestion`, message.author.displayAvatarURL({ dynamic : true }))
      .setTitle("[PENDING SUGGESTION]")
      .setColor(0x2f3136)
      .setDescription(`**Isi dari Suggestion :** \n${suggestionQuery}`)
      .addField("Status", 'PENDING')
      .setFooter("Tips : Kumpulkan 5 suara dan nanti admin akan merespon")
      .setTimestamp()

      message.channel.send('Submitted Suggestion!').then(m => m.delete({ timeout : 1000 }))
      suglog.send(embed);
    }
};