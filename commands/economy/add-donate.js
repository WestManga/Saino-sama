const {Client, Message, MessageEmbed } = require("discord.js");
const Guild = require("../../models/Guild");

module.exports = {
  name:'add-donate',
  category:'economy',
  description:'Menambahkan donasi point',
  usage:'<type donasi> <nominal>',
  aliases:['adddon','tambahdonasi'],
  cooldown:1000,
  run: async(client, message, args) => {
    await message.delete()
    let member = message.guild.member(message.mentions.users.first());
	let author = message.guild.members.cache.get(message.author.id);

	if	(message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.")  

	if (!member) return message.channel.send('Please Mention A User');

	if (!args[2]) return message.channel.send('Please Enter Valid Number');

	if (args[2] < 1)
		return message.channel.send('You Need To Transfer More Than 1');
	if (isNaN(args[2])) return message.channel.send('Thats Not A Number -_-');

	let target = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});

	if (!target) return bot.nodb(member.user);

	if (author.userID == member.id)
		return message.channel.send('How Is That Possible');

	if (member.user.bot) return message.channel.send('Its A Bot -_-');

    let guild = await Guild.findOne({
        guildID: message.guild.id,
    });
    // Moneylog
    const moneylog = client.channels.cache.get(guild.moneylogChannel);

    const now = new Date()

    if (args[1].toLowerCase() === 'rupiah') {
        let e = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setDescription(
				`**${message.author.username}**  Add Donation Stats to ${member.user.username} because donate Rp. ${args[2]}`,
			);
		target.donate.rupiah += Math.floor(parseInt(args[2]));
		target.save();
        target.donate.lastdonate = now;
		message.channel.send({ embed: e });

        let notifembed = new MessageEmbed()
			.setColor("YELLOW")
			.setAuthor(`Donasi Baru dengan Rupiah`)
			.setDescription(`Telah masuk donasi baru dengan rupiah :`)
			.addField("Saksi", `**${message.author}**\n**${message.author.id}**\n **${message.author.username}**`)
			.addField("Pemberi Donasi", `**${member.user}**\n**${member.user.id}**\n**${member.user.username}**`)
			.addField("Nominal Donasi", `\`\`\`Rp. ${args[2]}\`\`\``)
		moneylog.send({embed : notifembed});
    } else
    if (args[1].toLowerCase() === 'owocash') {
        let e = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setDescription(
				`**${message.author.username}**  Add Donation Stats to ${member.user.username} because donate ${args[2]} owocash`,
			);
		target.donate.owocash += Math.floor(parseInt(args[2]));
        target.donate.lastdonate = now;
		target.save();
		message.channel.send({ embed: e });

        let notifembed = new MessageEmbed()
			.setColor("YELLOW")
			.setAuthor(`Donasi Baru dengan Owocash`)
			.setDescription(`Telah masuk donasi baru dengan owocash :`)
			.addField("Saksi", `**${message.author}**\n**${message.author.id}**\n **${message.author.username}**`)
			.addField("Pemberi Donasi", `**${member.user}**\n**${member.user.id}**\n**${member.user.username}**`)
			.addField("Nominal Donasi", `\`\`\`${args[2]} Owocash\`\`\``)
		moneylog.send({embed : notifembed});
    } else
    if (args[1].toLowerCase() === 'anigold') {
        let e = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setDescription(
				`**${message.author.username}**  Add Donation Stats to ${member.user.username} because donate ${args[2]} Anigold`,
			);
		target.donate.rupiah += Math.floor(parseInt(args[2]));
        target.donate.lastdonate = now;
		target.save();
		message.channel.send({ embed: e });

        let notifembed = new MessageEmbed()
			.setColor("YELLOW")
			.setAuthor(`Donasi Baru dengan Anigold`)
			.setDescription(`Telah masuk donasi baru dengan anigold :`)
			.addField("Saksi", `**${message.author}**\n**${message.author.id}**\n **${message.author.username}**`)
			.addField("Pemberi Donasi", `**${member.user}**\n**${member.user.id}**\n**${member.user.username}**`)
			.addField("Nominal Donasi", `\`\`\`${args[2]} Gold\`\`\``)
		moneylog.send({embed : notifembed});
    }
  }
};