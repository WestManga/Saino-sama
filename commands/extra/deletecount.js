const Discord = require("discord.js")
const db = require("../../models/countmessages");

module.exports = {
  name:'deletecount',
  category:'extra',
  description:'Menghapus perhitungan pesan yang sedang berjalan',
  usage:'<jumlah message>',
  aliases:[''],
  cooldown:1000,
  run: async(client, message, args) => {
    let author = message.guild.members.cache.get(message.author.id);
    if (!author)
      return message.channel
        .send("User not found.")
        .then((m) => m.delete({ timeout: 5000 }));
    
    try {
        let data = await db.findOne({
            guildId: message.guild.id,
            userId: message.author.id,
        }).catch((err) => console.log(err));

        if (data) {
            db.findOne({ guildId: message.guild.id, userId: message.author.id, }).remove().exec();
        }
        if (!data) {
            message.channel.send('Kamu tidak punya data apapun!');
            return;
        }

        let notif = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Perhitungan message kamu telah berhasil di hapus!\nKamu dapat mengatur ulang perhitungan message kamu lagi..`)
        message.channel.send({ embed: notif }).then((m) => m.delete({ timeout: 10000 }));
        message.delete();
    } catch (err) {
        console.log(err);
        return;
    }
  }
};