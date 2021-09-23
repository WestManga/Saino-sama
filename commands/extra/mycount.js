const Discord = require("discord.js")
const db = require("../../models/countmessages");

module.exports = {
  name:'mycount',
  category:'extra',
  description:'Lihat hitungan message saya',
  usage:'',
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

        let guild = await Guild.findOne({ guildID: message.guild.id });

        if (!data) {
            message.channel.send(`Kamu tidak punya data hitungan!\nMari mulai menghitung pesan dengan command ${guild.prefix}count <jumlah pesan>`).then((m) => m.delete({ timeout: 5000 }));
            return;
        }

        let notif = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Kamu saat ini sudah mengirimkan ${data.message.now} pesan dari target ${data.message.max} pesan!`)
        .setFooter('Bot akan memberikan DM apabila perhitungan message telah selesai!')
        message.channel.send({ embed: notif }).then((m) => m.delete({ timeout: 10000 }));
        message.delete();
    } catch (err) {
        console.log(err);
        return;
    }
  }
};