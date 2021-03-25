const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'bio',
	aliases: ['desc'],
	category: 'account',
	description: 'Change Description.',
	usage: '[1/200]',
	run: async (client, message, args) => {
		let data = await User.findOne({
			guildID: message.guild.id,
			userID: message.author.id,
		});
		if (!data) return client.nodb();

		let context = args.slice(0).join(` `);

		if (!context) {
			data.bio = `\`\`\`<prefix>bio [text]\`\`\``;
			data.save();
			message.react('🎉');
			return;
		}

		if (context.length >= 200)
			return message.reply(
				`Unfortunately, I cannot give you such a description. It is ${context.length} long.`,
			);

		let a = new Discord.MessageEmbed()
			.setTitle(`You have successfully changed your bio.`)
			.setDescription(context)
			.setColor(process.env.COLOR);
		message.channel.send({ embed: a });
		data.bio = context;
		data.save();
	},
};