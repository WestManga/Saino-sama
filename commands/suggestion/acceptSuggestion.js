const { Client, MessageEmbed, Message } = require("discord.js")

module.exports = {
  name:'accept-suggestion',
  category:'suggestion',
  description:'Mengubah status suggestion menjadi diterima',
  usage:'<messageID> <alasan>',
  aliases:['saccept','terimas'],
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
      const acceptQuery = args.slice(1).join(" ");

      if (!messageID) return message.reply("Please specify a messageID");
      if (!acceptQuery) return message.reply("Please specify a reason for accept!");
      try {
          const suggestionChannel = message.guild.channels.cache.get(
              "823494509610270753"
          );
          const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
          console.log(suggestedEmbed);
          const data = suggestedEmbed.embeds[0];
          const acceptEmbed = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setTitle(`[ACCEPTED by ${message.author.tag}]`)
            .setDescription(data.description)
            .setColor("GREEN")
            .addField("Reason", acceptQuery);
        
            suggestedEmbed.edit(acceptEmbed);

        } catch (err) {
            console.log(err);
            message.channel.send("Suggestion does not exist.");
        }
    },
};