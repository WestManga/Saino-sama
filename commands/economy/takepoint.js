const { Client, MessageEmbed } = require('discord.js');
const User = require('../../models/User');
const Guild = require('../../models/Guild');

module.exports = {
	name: 'takepoint',
	aliases: ['takep'],
	category: 'economy',
	usage: '<mention> <amount of point>',
	description: 'Removes Someone Point',
	run: async (client, message, args) => {
		let member = message.guild.member(message.mentions.users.first());
		let author = message.guild.members.cache.get(message.author.id);
		if	(message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.")  
		if (!member) return message.channel.send('Please Mention A User');
		if (!args[1]) return message.channel.send('Please Enter Valid Number');
		if (args[1] < 1)
			return message.channel.send('You Need To Transfer More Than 1');
		if (isNaN(args[1])) return message.channel.send('Thats Not A Number -_-');
		const reason = args.slice(2).join(" ")
		if (!reason) return message.channel.send('Please enter valid reason');

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
				`**${message.author.username}**  Takes ${member.user.username} ${args[1]} Points\nWith Reason: ${reason}`,
			);
		target.point -= Math.floor(parseInt(args[1]));
		target.save();
		message.channel.send({ embed: e });

		Guild.findOne({ guildID: message.guild.id }, async (err, data) => {
			if(!data) return message.reply('this guild not have any data');

        	const moneylog = client.channels.cache.get(data.moneylogChannel);

			let notifembed = new MessageEmbed()
			.setColor("RED")
			.setAuthor(`NEW REMOVE POINT`)
			.setDescription(`Telah diambil sejumlah **Point** dengan laporan :`)
			.addField("Pengambil", `**${message.author}**\n**${message.author.id}**\n **${message.author.username}**`)
			.addField("Target", `**${member.user}**\n**${member.user.id}**\n**${member.user.username}**`)
			.addField("Alasan", `${reason}`)
			.addField("Jumlah Point", `\`\`\`Rp. ${args[1]}\`\`\``)
			moneylog.send({embed : notifembed});

		})
	},
};