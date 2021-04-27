const { Client, Message, MessageEmbed } = require('discord.js');
const User = require('../../models/User');
const Guild = require('../../models/Guild');
const { COLOR } = process.env;

module.exports = {
	name: 'addpoint',
	aliases: ['addp'],
	category: 'economy',
	usage: '<mention> <amount of point>',
	description: 'Give Someone Point',
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
				`**${message.author.username}**  Gives ${member.user.username} ${args[1]} Points\n With reason : ${reason}`,
			);
		target.point += Math.floor(parseInt(args[1]));
		target.save();
		message.channel.send({ embed: e });
		
		Guild.findOne({ guildID: message.guild.id }, async (err, data) => {
			if(!data) return message.reply('this guild not have any data');

        	const moneylog = client.channels.cache.get(data.moneylogChannel);

			let notifembed = new MessageEmbed()
			.setColor("BLUE")
			.setAuthor(`<:bmoney:836506631063470090> NEW ADD POINT`)
			.addField("Pemberi Point", `User: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
			.addField("Penerima", `User: ${member.user}\nUserID: ${member.user.id}\nUsername: ${member.user.username}`)
			.addField("Alasan", `${reason}`)
			.addField("Jumlah Point", `\`\`\`Rp. ${args[1]}\`\`\``)
			moneylog.send({embed : notifembed});

		})
	},
};