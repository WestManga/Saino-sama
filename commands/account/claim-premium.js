const { Client, Message, MessageEmbed } = require("discord.js");
const Guild = require("../../models/Guild");
const User = require("../../models/User");
const { simpleSupporterTitle } = require('../../handlers/profilehelper');

module.exports = {
  name:'claim-premium',
  category:'account',
  description:'Aktifasi sendiri untuk mendapatkan perks',
  usage:'',
  aliases:['cp'],
  cooldown:1000,
  run: async(client, message) => {
    await message.delete()
    const member = message.author

    let data = await User.findOne({
        guildID: message.guild.id,
        userID: member.id,
    });

    let guild = await Guild.findOne({
      guildID: message.guild.id,
    });

    const Pangkat = await simpleSupporterTitle(data.account.patreon);

    let point = data.point;
    
    if (point === 0) return message.channel.send(`Kamu tidak punya point yang cukup untuk claim Supporter!\nDibutuhkan minimum **5 Point** untuk claim Bronze Supporter.`).then(d => d.delete({ timeout : 10000 }))

    if (point > 5 && point < 15) {
        if (data.account.patreon === "Bronze") return message.channel.send(`You already Bronze Supporter!`).then(d => d.delete({ timeout : 20000 }));

        let e = new MessageEmbed()
			    .setColor(process.env.COLOR)
			    .setDescription(
				    `Sekarang **${member.username}** telah menjadi **Bronze Supporter!**\nTerimakasih telah membantu perkembangan server!`,
			    );
		    data.account.patreon = "Bronze";
		    data.save();
		    message.channel.send({ embed: e });
    } else
    if (point > 25 && point < 49) {
      if (data.account.patreon === "Silver") return message.channel.send(`You already Silver Supporter!`).then(d => d.delete({ timeout : 20000 }));

        let e = new MessageEmbed()
			    .setColor(process.env.COLOR)
			    .setDescription(
				    `Sekarang **${member.username}** telah menjadi **Silver Supporter!**\nTerimakasih telah membantu perkembangan server!`,
			    );
		    data.account.patreon = "Silver";
		    data.save();
		    message.channel.send({ embed: e });
    } else
    if (point > 50 && point < 99) {
      if (data.account.patreon === "Gold") return message.channel.send(`You already Gold Supporter!`).then(d => d.delete({ timeout : 20000 }));

        let e = new MessageEmbed()
			    .setColor(process.env.COLOR)
			    .setDescription(
				    `Sekarang **${member.username}** telah menjadi **Gold Supporter!**\nTerimakasih telah membantu perkembangan server!`,
			    );
		    data.account.patreon = "Gold";
		    data.save();
		    message.channel.send({ embed: e });
    } else
    if (point > 100) {
      if (data.account.patreon === "Platinum") return message.channel.send(`You already Platinum Supporter!`).then(d => d.delete({ timeout : 20000 }));

        let e = new MessageEmbed()
			    .setColor(process.env.COLOR)
			    .setDescription(
				    `Sekarang **${member.username}** telah menjadi **Platinum Supporter!**\nTerimakasih telah membantu perkembangan server!`,
			    );
		    data.account.patreon = "Platinum";
		    data.save();
		    message.channel.send({ embed: e });
    }

      // BUAT LOG
      const modlog = client.channels.cache.get(guild.modlogChannel);

			let notifembed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(`<:woow:819857034517676032> New Supporter!`)
			.setDescription(`Dear <@338418945620967434> seseorang telah menjadi supporter baru!`)
			.addField("Informasi User", `Mention: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
			.addField("Rank", `**${await Pangkat}**`)
			modlog.send({embed : notifembed});
  }
};