const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'title',
	aliases: ['julukan'],
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
			data.bio = `\`\`\`<prefix>title [text]\`\`\``;
			data.save();
			message.react('🎉');
			return;
		}

		if (context.length >= 200)
			return message.reply(
				`Unfortunately, I cannot give you such a description. It is ${context.length} long.`,
			);

		let a = new MessageEmbed()
			.setTitle(`You have successfully changed your title.`)
			.setDescription(context)
			.setColor(process.env.COLOR);
		message.channel.send({ embed: a });
		data.bio = context;
		data.save();
	},
};