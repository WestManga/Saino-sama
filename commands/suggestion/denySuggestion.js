const { Client, MessageEmbed, Message } = require("discord.js")

module.exports = {
  name:'deny-suggestion',
  category:'suggestion',
  description:'Merubah status suggestion menjadi ditolak',
  usage:'<messageID> <alasan>',
  aliases:['sdeny','tolaks'],
  cooldown:10,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(client, message, args) => {
      if (!message.member.permissions.has("MANAGE_CHANNELS")) return;
      const messageID = args[0];
      const denyQuery = args.slice(1).join(" ");

      if (!messageID) return message.reply("Please specify a messageID");
      if (!denyQuery) return message.reply("Please specify a reason for deny!");
      try {
            let ch =  await Guild.findOne({
            guildID: message.guild.id
            });
    
            const suglog = client.channels.cache.get(ch.suggestionChannel)
            // kalau channel ngga ada
            if (!suglog) return message.channel.send(`There is no channel in this guild which is called \`suggestion\`\nPlease setting first with command \`setsugch\``).then(m => m.delete({ timeout : 5000 }))

          const suggestedEmbed = await suglog.messages.fetch(messageID);
          console.log(suggestedEmbed);
          const data = suggestedEmbed.embeds[0];
          const denyEmbed = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setTitle(`[DITOLAK by ${message.author.tag}]`)
            .setDescription(data.description)
            .setColor("RED")
            .addField("Reason", denyQuery);
        
            suggestedEmbed.edit(denyEmbed);

        } catch (err) {
            console.log(err);
            message.channel.send("Suggestion does not exist.");
        }
    },
};