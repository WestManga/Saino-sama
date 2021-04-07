const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const mongoose = require('mongoose');
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
        let user = message.mentions.users.first() || message.author || messsage.guild.members.cache.get(args[0])

        if (user.presence.status === "dnd") user.presence.status = "Do Not Disturb";
        if (user.presence.status === "idle") user.presence.status = "Idle";
        if (user.presence.status === "offline") user.presence.status = "Offline";
        if (user.presence.status === "online") user.presence.status = "Online";

        function game() {
            let game;
            if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
            else if (user.presence.activities.length < 1) game = "None"
            return game;
          }
        
          
          let x = Date.now() - user.createdAt;
          let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
          let created = Math.floor(x / 86400000);
          let joined = Math.floor(y / 86400000);
        
          const member = message.guild.member(user);
          let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None";
          let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY");
          let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY");
          let status = user.presence.status;
          let avatar = user.avatarURL({ size: 4096 });
         
		if (member.bot) return message.channel.send('Its A Bot -_-');

        const members = message.guild.members.cache
        .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
        .array();

        const position = new Promise((ful) => {
        for (let i = 1; i < members.length + 1; i++) {
            if(members[i - 1].id === member.id) ful(i)
            }   
        })

		let data = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});
		let guildData = await Guild.findOne({ guildID: message.guild.id });
		if (!data) return client.nodb(member.user);

        if (data.point >= "1") data.point = "Bronze Status";

        let premium = data.point;

		let inline = true;
		let e = new MessageEmbed()
            .setAuthor(user.tag, avatar)
			.setTitle(`${user.username} Profile`)
			.setDescription(`**Title : ** ${data.bio}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setColor(COLOR)
            .addField("Status", status)
            .addField("💕 Beloved Waifu", `${data.waifu}`)
            .addField("🎀 Premium", premium, true)
            .addField('🔰 Point', `${data.point || 0}`, true)
            .addField("Tanggal Pembuatan Akun", `${createdate} \nSejak **${created}** hari lalu`)
            .addField("Tanggal Bergabung", `${joindate} \nSejak **${joined}** hari lalu`)
			.addField('💰 Money', `Rp. ${data.money || 0}`, inline)
			.addField('🛡️ Level', `${data.level || 1}`, inline)
			.addField('🏃‍♂️ XP', `${data.xp || 0}/${process.env.UPXP}`, inline)
			.addField('📧 Messages', `${data.messages || 0}`, inline)
			.addField('👮 Warn', `${data.warn || 0}/${process.env.WARN}`, inline)
			.addField('💤 AFK', `${data.afk || false}`, inline)
            .setImage(`${data.banner}`)
            .setFooter(
                `${user.username} adalah Guild Member ke #${await position}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setTimestamp()
			.addField(
				'📃 Custom Status',
				`${data.status || guildData.prefix + `setstatus [text]`}`,
			);
		message.channel.send({ embed: e });
	},
};