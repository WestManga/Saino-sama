const { Client, Message, MessageEmbed } = require('discord.js');
const User = require('../../models/User');
const Guild = require('../../models/Guild');

module.exports = {
	name: 'addmoney',
	aliases: ['addm'],
	category: 'economy',
	usage: '<mention> <amount of money>',
	description: 'Give Someone Money',
	run: async (client, message, args) => {
		let member = message.guild.member(message.mentions.users.first());
		let author = message.guild.members.cache.get(message.author.id);
		if	(message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.")  
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
				`**${message.author.username}**  Gives ${member.user.username} ${args[1]} Money`,
			);
		target.money += Math.floor(parseInt(args[1]));
		target.save();
		message.channel.send({ embed: e });
		
		Guild.findOne({ guildID: message.guild.id }, async (err, data) => {
			if(!data) return message.reply('this guild not have any data');

        	const moneylog = client.channels.cache.get(data.moneylogChannel);

			let notifembed = new MessageEmbed()
			.setColor("YELLOW")
			.setAuthor(`NEW ADD MONEY`)
			.setDescription(`Telah diberikan sejumlah uang dengan laporan :`)
			.addField("Pemberi", `**${message.author}**\n**${message.author.id}**\n **${message.author.username}**`)
			.addField("Penerima", `**${member.user}**\n**${member.user.id}**\n**${member.user.username}**`)
			.addField("Nominal Uang", `\`\`\`Rp. ${args[1]}\`\`\``)
			moneylog.send({embed : notifembed});

		})
	},
};