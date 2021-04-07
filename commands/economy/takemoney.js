const { Client, MessageEmbed } = require('discord.js');
const User = require('../../models/User');

module.exports = {
	name: 'takemoney',
	aliases: ['takem'],
	category: 'economy',
	usage: '<mention> <amount of money>',
	description: 'Removes Someone Money',
	run: async (client, message, args) => {
		let member = message.guild.member(message.mentions.users.first());
        let author = message.guild.members.cache.get(message.author.id);
		if	(message.author.id !== '338418945620967434') return message.channel.send("This is owner only command.")
		if (!member) return message.channel.send('Please Mention A User');
		if (!args[1]) return message.channel.send('Please Enter Valid Number');
		if (args[1] < 1)
			return message.channel.send('You Need To Transfer More Than 1');
		if (isNaN(args[1])) return message.channel.send('Thats Not A Number -_-');

		let target = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});

		if (!target) return bot.nodb(member.user);

		if (author.userID == member.id)
			return message.channel.send('How Is That Possible');
		if (member.user.bot) return message.channel.send('Its A Bot -_-');

		let e = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setDescription(
				`**${message.author.username}**  Takes ${member.user.username} ${args[1]} Money`,
			);
		target.money -= Math.floor(parseInt(args[1]));
		target.save();
		message.channel.send({ embed: e });

		let notifembed = new MessageEmbed()
			.setColor("RED")
			.setAuthor(`NEW REMOVE MONEY`)
			.setDescription(`Telah diambil sejumlah Uang dengan laporan :`)
			.addField("Pengambil", `**${message.author.username}**`)
			.addField("Yang Diambil", `**${member.user.username}**`)
			.addField("Jumlah Uang", `\`\`\`Rp. ${args[1]}\`\`\``)
		client.channels.cache.get("829294897366433822").send({embed : notifembed});
	},
};