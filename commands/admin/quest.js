const Discord = require("discord.js")

module.exports = {
  name:'quest',
  category:'admin',
  description:'Menambahkan statistik quest selesai ke user',
  usage:'<mention user>',
  aliases:[''],
  cooldown:1000,
  run: async(client, message, args) => {
    let member = message.mentions.users.first() || messsage.guild.members.cache.get(args[0]);
    let author = message.guild.members.cache.get(message.author.id);
    if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send("You dont have permission for used this command!");

    if (!member) {
        message.channel.send('Please mention member first!').then((m) => m.delete({ timeout: 5000 }));
        return;
    }

    // Database
    let data = await User.findOne({
        guildID: message.guild.id,
        userID: member.id,
    });

    if (!data) return bot.nodb(member.user);

    let guild = await Guild.findOne({
        guildID: message.guild.id,
    });

    if (!guild) {
        return;
    }

    const moneylog = client.channels.cache.get(guild.moneylogChannel);

    
    if (args[1].toLowerCase() === 'done') {
      data.questdone++;
      let notif = new Discord.MessageEmbed()
      .setDescription(`Berhasil menambahkan point quest selesai ke akun ${member.username}\nPoint saat ini: ${data.questdone} Poin`)
      .setColor(process.env.COLOR)
      message.channel.send({ embed: notif }).then((m) => m.delete({ timeout: 5000 }));
      data.save();

      // Send notif to log admin
      let notifadmin = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setTitle('Penambahan Point Quest')
      .addField('Admin', message.author.username, true)
      .addField('Penerima', member.username, true)
      .addField('Jumlah Point', number)
      moneylog.send({ embed: notifadmin })
    } else
    if (args[1].toLowerCase() === 'take') {
      const number = args[2];
      if (!number) {
        return message.channel.send('Please input point yang mau diambil')
        .then((m) => m.delete({ timeout: 5000 }));
      }
      if (isNaN(number))
        return message.channel
          .send("Kamu harus memasukan nominal dalam angka!")
          .then((m) => m.delete({ timeout: 5000 }));
          
      data.questdone -= number;
      data.save();

      // Notif
      let notif = new Discord.MessageEmbed()
      .setDescription(`Berhasil mengurangkan ${number} point quest ke akun ${member.username}\nPoint saat ini: ${data.questdone} Poin`)
      .setColor(process.env.COLOR)
      message.channel.send({ embed: notif }).then((m) => m.delete({ timeout: 5000 }));

      // Send notif to log admin
      let notifadmin = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setTitle('Pengurangan Point Point Quest')
      .addField('Admin', message.author.username, true)
      .addField('Penerima', member.username, true)
      .addField('Jumlah Point', number)
      moneylog.send({ embed: notifadmin })
    }
  }
};