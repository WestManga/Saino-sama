const { Client, Message, MessageEmbed } = require("discord.js");
const {
    COLOR
} = process.env;

module.exports = {
    name: "setfinedmax",
    aliases: ["setfmax"],
    description: "Setting denda maksimum",
    usage: "<nominal>",
    category: "settings",
    /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
    run: async(client, message, args) => {
        if (message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.")
        if (!args[0]) return message.channel.send('Please Enter Valid Number');
		if (args[0] < 1)
			return message.channel.send('You Need To Set Fined More Than 1');
		if (isNaN(args[0])) return message.channel.send('Thats Not A Number -_-');
        
        
        let data = await Guild.findOne({
            guildID: message.guild.id
        });

        const modlog = client.channels.cache.get(data.modlogChannel);

        let e = new MessageEmbed()
        .setDescription(`Successfully set fined maximum Rp. ${args[0]}`)
        .setTimestamp(new Date())
        .setColor(COLOR)
        modlog.send({embed: e});
        data.fined.max = args[0]; data.save();
    },
};