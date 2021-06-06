const Discord = require("discord.js")
const { COLOR } = process.env;

module.exports = {
  name:"setpoint",
  category:"economy",
  description:"Set user point add or remove",
  usage:'<user> <add or remove> <nominal> <reason>',
  cooldown:1000,
  run: async(client, message, args) => {
        let member = message.guild.member(message.mentions.users.first());
		let author = message.guild.members.cache.get(message.author.id);

		if (message.author.id !== process.env.OWNER) {
            return message.channel.send("This is owner only command.");
        }

		if (!member) {
            return message.channel.send("Please Mention A User");
        }

        if (!args[1]) {
            return message.channel.send("You need argument for this command. Argument is `add` or `remove`");
        }

		if (!args[2]) {
            return message.channel.send("Please Enter Valid Number");
        }

		if (args[2] < 1) {
			return message.channel.send("You Need To Transfer More Than 1");
        }

		if (isNaN(args[2])) { 
            return message.channel.send("Thats Not A Number -_-");
        }

		const reason = args.slice(3).join(" ");

		if (!reason) return message.channel.send("Please enter valid reason");

		let target = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});

		if (author.userID == member.id)
			return message.channel.send("How Is That Possible");
		if (member.user.bot) {
            return message.channel.send("Its A Bot -_-");
        }

        //args
        if (args[1].toLowerCase() === "add") {
            let e = new Discord.MessageEmbed()
            .setColor(COLOR)
            .setDescription(
                `**${message.author.username}** Gives ${member.user.username} ${args[2]} Points\n With reason : ${reason}`,
            );
            target.point += Math.floor(parseInt(args[2]));
            target.save();
            message.channel.send({ embed: e });

            Guild.findOne({ guildID: message.guild.id }, async (err, data) => {
                if(!data) {
                    return message.reply('this guild not have any data');
                }

                const moneylog = client.channels.cache.get(data.moneylogChannel);
    
                let notifembed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setAuthor("NEW ADD POINT")
                .addField("Admin", `User: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
                .addField("Target", `User: ${member.user}\nUserID: ${member.user.id}\nUsername: ${member.user.username}`)
                .addField("Alasan", `\`\`\`${reason} Point\`\`\``)
                .addField("Jumlah Point", `\`\`\`${args[2]} Point\`\`\``)
                moneylog.send({embed : notifembed});
            })
        } else
        if (args[1].toLowerCase() === "remove" || "take") {
            let e = new Discord.MessageEmbed()
            .setColor(COLOR)
            .setDescription(
                `**${message.author.username}** Removed ${args[2]} Points from ${member.user.username} \nWith reason : ${reason}`,
            );
            if (target.point -= Math.floor(parseInt(args[2])) < 0) {
                message.channel.send(`User ${member.user.username} tidak punya point yang cukup untuk diambil\nSaya telah membuatnya menjadi 0`);
                target.point = 0;
                target.save();
            } else
            if (target.point -= Math.floor(parseInt(args[2])) > 1) {
                target.point -= Math.floor(parseInt(args[2]));
                target.save();
                message.channel.send({ embed: e });
            }
            
            Guild.findOne({ guildID: message.guild.id }, async (err, data) => {
                if(!data) {
                    return message.reply('this guild not have any data');
                }

                const moneylog = client.channels.cache.get(data.moneylogChannel);
    
                let notifembed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor("NEW REMOVE POINT")
                .addField("Admin", `User: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
                .addField("Target", `User: ${member.user}\nUserID: ${member.user.id}\nUsername: ${member.user.username}`)
                .addField("Alasan", `\`\`\`${reason} Point\`\`\``)
                .addField("Jumlah Point", `\`\`\`${args[2]} Point\`\`\``)
                moneylog.send({embed : notifembed});
            })
        }
    }
};