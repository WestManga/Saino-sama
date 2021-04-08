const { Client, Message, MessageEmbed } = require('discord.js');
const User = require('../../models/User');
const Guild = require('../../models/Guild');

module.exports = {
	name: 'setpremium',
	aliases: ['setpre'],
	category: 'account',
	usage: '<mention> <premium class>',
	description: 'Setting premium class member `Bronze` `Silver` `Gold` `Platinum`',
	run: async (client, message, args) => {
		let member = message.guild.member(message.mentions.users.first());
		let author = message.guild.members.cache.get(message.author.id);
		if	(message.author.id !== '338418945620967434') return message.channel.send("This is owner only command.")  
		if (!member) return message.channel.send('Please Mention A User');
        let premium = args[1];

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
				`**${message.author.username}** Set ${member.user.username} to ${args[1]} Class`,
			);
		target.account.patreon = premium;
		target.save();
		message.channel.send({ embed: e });
	},
};