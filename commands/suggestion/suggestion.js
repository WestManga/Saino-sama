const { Client, Message, MessageEmbed } = require("discord.js")

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

      let Channel = message.guild.channels.cache.find(
        (ch) => ch.id === "823494509610270753"
      );
      // kalau channel ngga ada
      if (!Channel)
      return message.channel.send(`There is no channel in this guild which is called \`suggestion\``);
      message.delete();

      const embed = new MessageEmbed()
      .setAuthor(`${message.author.username} Suggestion`, message.author.displayAvatarURL({ dynamic : true }))
      .setTitle("[PENDING SUGGESTION]")
      .setColor(0x2f3136)
      .setDescription(`**Isi dari Suggestion :** \n${suggestionQuery}`)
      .addField("Status", 'PENDING')
      .setFooter("Tips : dapatkan 5 vote dan admin akan merespon")
      .setTimestamp()

      message.channel.send('Submitted Suggestion!').then(m => m.delete({ timeout : 1000 }))
      let laporan = await Channel.send(embed);
      await laporan.react('👍').then(() => laporan.react('👎'));
    }
};