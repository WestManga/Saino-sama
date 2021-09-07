const Discord = require("discord.js")

module.exports = {
  name:'setbudget',
  category:'admin',
  description:'setting budget for ptc',
  usage:'<add/remove/reset> <nominal>',
  aliases:[''],
  cooldown:1000,
  run: async(client, message, args) => {
    await message.delete()
	let author = message.guild.members.cache.get(message.author.id);

	if (message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.");

    if (!args[0]) return message.reply("Please specify a agrument. Agrument is `add`, `remove` or `reset`");

    if (!args[1]) return message.channel.send('Please Enter Valid Number');

	if (args[1] < 1)
		return message.channel.send('Kamu harus setting budget lebih dari 1');
	if (isNaN(args[1])) return message.channel.send('Maaf itu bukan angka!');

    let guild = await Guild.findOne({
        guildID: message.guild.id,
    });
    // Moneylog
    const moneylog = client.channels.cache.get(guild.moneylogChannel);

    if (args[0].toLowerCase() === "add") {
        let notif = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`Budget telah ditambahkan Rp.${args[1]}\nSaat ini budget PTC sebanyak Rp.${guild.budget}`)
        .setTimestamp()
        moneylog.send({ embed: notif });

        guild.budget += args[1];
        guild.save();

        message.channel
        .send('Budget berhasil ditambahkan!')
        .then((m) => m.delete({ timeout: 10000 }));
    } else
    if (args[0].toLowerCase() === "remove") {
        if (guild.budget < args[1]) {
            return message.channel
            .send("Budget tidak berhasil dikurangkan karena saldo tidak cukup!")
            .then((m) => m.delete({ timeout: 10000 }));
        }
        
        let notif = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`Budget telah dikurangkan Rp.${args[1]}\nSaat ini budget PTC sebanyak Rp.${guild.budget}`)
        .setTimestamp()
        moneylog.send({ embed: notif });

        guild.budget -= args[1];
        guild.save();

        message.channel
        .send('Budget berhasil dikurangkan!')
        .then((m) => m.delete({ timeout: 10000 }));
    } else
    if (args[0].toLowerCase() === "reset") {
        let notif = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`Budget PTC sudah direset!!`)
        .setTimestamp()
        moneylog.send({ embed: notif });

        guild.budget = 0;
        guild.save();

        message.channel
        .send('Budget telah berhasil direset!!')
        .then((m) => m.delete({ timeout: 10000 }));
    }   
  }
};