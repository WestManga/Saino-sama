const { MessageEmbed } = require('discord.js');
const User = require('../../models/User');

module.exports = {
	name: 'takepoint',
	aliases: ['takep'],
	category: 'economy',
	usage: '<mention> <amount of point>',
	description: 'Removes Someone Point',
	run: async (bot, message, args) => {
		let member = message.guild.member(message.mentions.users.first());
        let author = message.guild.members.cache.get(message.author.id);
		if (!member) return message.channel.send('Please Mention A User');
        if (!author.hasPermission("BAN_MEMBERS")) return;        
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
				`**${message.author.username}**  Takes ${member.user.username} ${args[1]} Points`,
			);
		target.point -= Math.floor(parseInt(args[1]));
		target.save();
		message.channel.send({ embed: e });
	},
};