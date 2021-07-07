const Discord = require("discord.js");
const User = require('../../models/User');
const Guild = require('../../models/Guild');

module.exports = {
  name:'change',
  category:'account',
  description:'Change messages to Point',
  usage:'<nominal>',
  aliases:[''],
  cooldown:1000,
  run: async(client, message, args) => {
    let author = message.author;
    let avatar = author.displayAvatarURL({ size: 1024, dynamic: true })

    // Cek nominal //
    let amount = args[0];
    if (isNaN(amount)) return message.reply('Nominal harus berupa angka..').then((d) => d.delete({ timeout: 10000 }));

    // FIND DATA //
    let data = await User.findOne({ guildID: message.guild.id, userID: author.id});
    
    if (!data) {
        return message.reply("Saya tidak menemukan data user..").then((d) => d.delete({ timeout: 10000 }));
    }

    // Counting //
    let mymessage = data.messages;
    let onepoint = 200;

    if (mymessage < amount) {
        return message.reply(`Jumlah pesan kamu kurang untuk ditukarkan.\nKamu hanya mempunyai ${mymessage} pesan.`).then((d) => d.delete({ timeout: 10000 }));
    }

    if (mymessage < onepoint) {
        return message.reply(`Jumlah pesan kamu kurang untuk ditukarkan.\nKamu hanya mempunyai ${mymessage} pesan.`).then((d) => d.delete({ timeout: 10000 }));
    }

    let getpoint = (amount / onepoint);
    let pointresults = Math.floor(parseInt(getpoint));

    // Embed //
    let ok = new Discord.MessageEmbed()
    .setAuthor(`${author.username}`, `${avatar}`)
    .setTitle(`<:transfer:856510446332674098> | Change Messages`)
    .setDescription(`Pertukaran point berhasil!\nKamu telah mendapatkan point senilai **${pointresults} Poin** dengan menukarkan ${amount} pesan.`)
    .setColor(client.warna.success)
    .setFooter(`Cobalah gunakan ${process.env.PREFIX}claim-premium untuk mengambil premium benefit apabila pointmu sudah mencukupi!`)
    .setTimestamp()

    // SAVE //
    data.message -= amount;
    data.point += pointresults;
    data.save();
    await message.channel.send({ embed: ok }).then((d) => d.delete({ timeout: 20000 }));
    
    // Logging //
    let guild = await Guild.findOne({
        guildID: message.guild.id,
    });

    const moneylog = client.channels.cache.get(guild.moneylogChannel);

    let notifembed = new Discord.MessageEmbed()
		.setColor(client.warna.warning)
		.setDescription(`User ${author.username} telah menukarkan pesan berjumlah **${amount} pesan** dan mendapatkan poin senilai **${pointresults} Poin**`)
		.setTitle(`<:transfer:856510446332674098> CONVERT MESSAGES`)
	moneylog.send({ embed : notifembed });

    message.delete({ timeout: 1000 });
  }
};