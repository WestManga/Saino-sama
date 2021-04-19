const { Client, MessageEmbed, Message } = require("discord.js")

module.exports = {
  name:'consider-suggestion',
  category:'suggestion',
  description:'Merubah status suggestion menjadi Consider/sedang dipikirkan',
  usage:'<messageID> <alasan>',
  aliases:['sconsider','pikirs'],
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
      const considerQuery = args.slice(1).join(" ");

      if (!messageID) return message.reply("Please specify a messageID");
      if (!considerQuery) return message.reply("Please specify a reason for consider!");
      try {
          const suggestedEmbed = await suplog.messages.fetch(messageID);
          console.log(suggestedEmbed);
          const data = suggestedEmbed.embeds[0];
          const considerEmbed = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setTitle(`[SEDANG DIPIKIRKAN by ${message.author.tag}]`)
            .setDescription(data.description)
            .setColor("YELLOW")
            .addField("Reason", considerQuery);
        
            suggestedEmbed.edit(considerEmbed);

        } catch (err) {
            console.log(err);
            message.channel.send("Suggestion does not exist.");
        }
    },
};