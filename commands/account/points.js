const { MessageEmbed } = require('discord.js');
const User = require('../../models/User');

module.exports = {
	name: 'points',
	aliases: ['plb'],
	category: 'account',
	description: 'Show User Point Leaderboard on the server',
	usage: '',
	run: async (client, message, args) => {
		User.find({ guildID: message.guild.id })
			.sort([['point', 'descending']])
			.exec((err, res) => {
				let embed = new MessageEmbed().setColor(process.env.COLOR);
				if (res.length === 0) {
					embed.setDescription(
						'Unfortunately the table for this server is empty.',
					);
				} else if (res.length < 10) {
					for (i = 0; i < res.length; i++) {
						let name = client.users.cache.get(res[i].userID).tag || 'Unknown';
						if (name == 'Unknown') {
							embed.addField(
								`${i + 1}. ${name}`,
								`**Point**: ${res[i].point}`,
							);
						} else {
							embed.addField(
								`${i + 1}. ${name}`,
								`**Point**: ${res[i].point}`,
							);
						}
					}
				} else {
					for (i = 0; i < 10; i++) {
						let name = bot.users.cache.get(res[i].userID).tag || 'Unknown';
						if (name == 'Empty') {
							embed.addField(
								`${i + 1}. ${name}`,
								`**Point**: ${res[i].point}`,
							);
						} else {
							embed.addField(
								`${i + 1}. ${name}`,
								`**Point**: ${res[i].point}`,
							);
						}
					}
				}
				message.channel.send(embed);
			});
	},
};