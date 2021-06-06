const { MessageEmbed } = require("discord.js");
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
		const onepoint = 2000;
		const donasinya = args[2];
		const getpoin = ( donasinya / onepoint );
		const poinresult = Math.floor(parseInt(getpoin));

        let e = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setDescription(
				`Terimakasih **${member.user.username}** karena telah berdonasi sebanyak Rp. ${args[2]}\n**${member.user.username}** telah mendapatkan **${poinresult} Points**`,
			);
		target.donate.rupiah += Math.floor(parseInt(args[2]));
		target.point += poinresult;
		target.save();
        target.donate.lastdonate = now;
		message.channel.send({ embed: e });

        let notifembed = new MessageEmbed()
			.setColor("YELLOW")
			.setDescription(`User ${message.author.username} telah memberikan donasi sebanyak Rp.${args[2]} dan mendapatkan **${poinresult} Point**`)
			.setTitle(`<a:bot:824614191984934963> DONASI RUPIAH`)
			.addField("Saksi", `User: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
			.addField("Pemberi Donasi", `User: ${member.user}\nUserID: ${member.user.id}\nUsername: ${member.user.username}`)
			.addField("Nominal Donasi", `\`\`\`Rp. ${args[2]}\`\`\``)
		moneylog.send({ embed : notifembed });
    } else
    if (args[1].toLowerCase() === 'owocash') {
		const onepoint = 50000;
		const donasinya = args[2];
		const getpoin = ( donasinya / onepoint );
		const poinresult = Math.floor(parseInt(getpoin));

        let e = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setDescription(
				`Terimakasih **${member.user.username}** karena telah berdonasi sebanyak ${args[2]} wcash\n**${member.user.username}** telah mendapatkan **${poinresult} Points**`,
			);
		target.donate.owocash += Math.floor(parseInt(args[2]));
		target.point += poinresult;
        target.donate.lastdonate = now;
		target.save();
		message.channel.send({ embed: e });

        let notifembed = new MessageEmbed()
			.setColor("6a90cc")
			.setDescription(`User ${message.author.username} telah memberikan donasi sebanyak ${args[2]} wcash dan mendapatkan **${poinresult} Point**`)
			.setTitle(`<a:bot:824614191984934963> DONASI OWOCASH`)
			.addField("Saksi", `User: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
			.addField("Pemberi Donasi", `User: ${member.user}\nUserID: ${member.user.id}\nUsername: ${member.user.username}`)
			.addField("Nominal Donasi", `\`\`\`${args[2]} wcash\`\`\``)
		moneylog.send({embed : notifembed});
    } else
    if (args[1].toLowerCase() === 'anigold') {
		const onepoint = 25000;
		const donasinya = args[2];
		const getpoin = ( donasinya / onepoint );
		const poinresult = Math.floor(parseInt(getpoin));

        let e = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setDescription(
				`Terimakasih **${member.user.username}** karena telah berdonasi sebanyak ${args[2]} Gold\n**${member.user.username}** telah mendapatkan **${poinresult} Points**`,
			);
		target.donate.anigold += Math.floor(parseInt(args[2]));
		target.point += poinresult;
        target.donate.lastdonate = now;
		target.save();
		message.channel.send({ embed: e });

        let notifembed = new MessageEmbed()
			.setColor("6a90cc")
			.setDescription(`User ${message.author.username} telah memberikan donasi sebanyak ${args[2]} Gold dan mendapatkan **${poinresult} Point**`)
			.setTitle(`<a:bot:824614191984934963> DONASI ANIGOLD`)
			.addField("Saksi", `User: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
			.addField("Pemberi Donasi", `User: ${member.user}\nUserID: ${member.user.id}\nUsername: ${member.user.username}`)
			.addField("Nominal Donasi", `\`\`\`${args[2]} Gold\`\`\``)
    }
  }
};