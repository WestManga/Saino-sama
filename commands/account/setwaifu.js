const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "setwaifu",
    usage: "<waifu name>",
    aliases: ["swf"],
    description: "Set Your Beloved Waifu",
    category: "account",
    run: async(client, message, args) => {
        let reason = args.join(" ").slice(0);
        if(!reason) return message.channel.send("Please Specify The Text");
        if(reason.length >= 100) return message.channel.send(`Unfortunately, I cannot give you such a description. It is ${reason.length} long`);
        let data = await User.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        });

        if(!data) return client.nodb(message.author);

        let e = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Your Beloved Waifu set to ${reason}`)
        data.waifu = reason; data.save();
        message.channel.send({embed: e});
    },
};