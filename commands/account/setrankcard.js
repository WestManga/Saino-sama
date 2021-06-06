const Discord = require("discord.js");

module.exports = {
  name: "setrankcard",
  category: "account",
  description: "Setting custom your rankcard",
  usage: "<color/bg> <input>",
  aliases: ["src"],
  cooldown: 1000,
  run: async (client, message, args) => {
    message.delete({ timeout : 10000 });
    let data = await User.findOne({
      userID: message.author.id,
      guildID: message.guild.id,
    });

    if (!data) {
      return client.nodb(message.author);
    }

    if(!args[0]) return message.reply('Tolong gunakan argumen yang benar!\nArgumennya adalah:\n`color / warna` untuk mengganti warna\n`bg / background` untuk ganti gambar').then(d => d.delete({ timeout : 20000 }));

    if (args[0].toLowerCase() === "warna") {
      if (!args[1]) {
        return message.reply('Untuk warna kamu bisa pakai HEX Code\n**Contoh**:`FFFFFF` tidak perlu pakai `#`');
      }

      if (args[1].length >= 300)
      return message.channel.send(
        `Unfortunately, I cannot give you such a description. It is ${args[1].length} long`
      ).then(d => d.delete({ timeout : 20000 }));

      let e = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Set your rankcard color to ${args[1]}`);
        data.rankcard.color = args[1];
        data.save();
        message.channel.send({ embed: e }).then(d => d.delete({ timeout : 20000 }));;
    } else 
    if (args[0].toLowerCase() === "bg") {
      if (!args[1]) {
        return message.reply('Gambar harus pakai url lengkap!\nKalau gambar gamuncul preview berarti gambar gabisa dipakai').then(d => d.delete({ timeout : 20000 }));
      }

      if (args[1].length >= 300)
      return message.channel.send(
        `Unfortunately, I cannot give you such a description. It is ${args[1].length} long`
      ).then(d => d.delete({ timeout : 20000 }));

      let e = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Set your rankcard background to ${args[1]}`);
        data.rankcard.background = args[1];
        data.save();
        message.channel.send({ embed: e }).then(d => d.delete({ timeout : 20000 }));
    }
  }
};