const { MessageEmbed } = require('discord.js');
const {
    COLOR
} = process.env;

module.exports = {
	name: 'profile',
	aliases: ['pf', 'p'],
	category: 'account',
	description: 'Show The User Bio',
	usage: '[mention]',
	run: async (client, message, args) => {
		let member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.author;

		if (member.bot) return message.channel.send('Its A Bot -_-');
		let data = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});
		let guildData = await Guild.findOne({ guildID: message.guild.id });
		if (!data) return client.nodb(member.user);

		let inline = true;
		let e = new MessageEmbed()
			.setTitle(`${member.displayName} Profile`)
			.setDescription(`**Title:**`, `${data.bio || guildData.prefix + 'bio [text]'}`)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setColor(COLOR)
			.addField('💰 Money', `${data.money || 0}`, inline)
            .addField('💠 Point', `${data.point || 0}`, inline)
			.addField('🛡️ Level', `${data.level || 1}`, inline)
			.addField('🏃‍♂️ XP', `${data.xp || 0}/${process.env.UPXP}`, inline)
			.addField('📧 Messages', `${data.messages || 0}`, inline)
			.addField('👮 Warn', `${data.warn || 0}/${process.env.WARN}`, inline)
			.addField('💤 AFK', `${data.afk || false}`, inline)
            .setImage(`${data.banner}`)
			.addField(
				'Status',
				`${data.status || guildData.prefix + `setstatus [text]`}`,
			);
		message.channel.send({ embed: e });
	},
};