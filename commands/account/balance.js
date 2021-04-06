const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const mongoose = require('mongoose');
const {
    COLOR
} = process.env;

module.exports = {
	name: 'balance',
	aliases: ['bal', '$'],
	category: 'account',
	description: 'Show User Balance',
	usage: '[mention]',
	run: async (client, message, args) => {
        let user = message.mentions.users.first() || message.author || messsage.guild.members.cache.get(args[0])
        
          const member = message.guild.member(user);
          let avatar = user.avatarURL({ size: 4096 });

		if (member.bot) return message.channel.send('Its A Bot -_-');

		let data = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});
		let guildData = await Guild.findOne({ guildID: message.guild.id });
		if (!data) return client.nodb(member.user);

		let inline = true;
		let e = new MessageEmbed()
            .setAuthor(user.tag, avatar)
			.setTitle(`${user.username} Balance`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setColor(COLOR)
            .addField('Point', `$$ ${data.point || 0}`, true)
			.addField('💰 Money', `$ ${data.money || 0}`, inline)
		message.channel.send({ embed: e });
	},
};