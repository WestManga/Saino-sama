const Discord = require("discord.js")
const db = require("../../models/countmessages");

module.exports = {
  name:'count',
  category:'extra',
  description:'Menghitung message di main channel',
  usage:'<jumlah message>',
  aliases:[''],
  cooldown:1000,
  run: async(client, message, args) => {
    let author = message.guild.members.cache.get(message.author.id);
    if (!author)
      return message.channel
        .send("User not found.")
        .then((m) => m.delete({ timeout: 5000 }));
    
    let sekarang = new Date()
    let mmax = args[0];
    let mmin = "0";

    if (!mmax) return message.channel.send('Tolong masukan jumlah message maksimum!');

	if (mmax < 1)
		return message.channel.send('Kamu harus mengisi jumlah message lebih dari 1');
	if (isNaN(mmax)) return message.channel.send('Itu bukan angka men...');

    try {
        let data = await db.findOne({
            guildId: message.guild.id,
            userId: message.author.id,
        }).catch((err) => console.log(err));

        if (data && data.message.now >= data.message.max) {
            db.findOne({ guildId: message.guild.id, userId: message.author.id, }).remove().exec();
        }

        if (!data) {
            db.findOne(
                { guildId: message.guild.id, userId: message.author.id },
                async (err, data) => {
                  if (err) throw err;
                  if (!data) {
                    data = new db({
                      guildId: message.guild.id,
                      userId: message.author.id,
                      message: 
                        {
                          now: mmin,
                          max: mmax,
                        },
                      date: sekarang,
                    });
                  }
                  data.save();
                }
              );
        }

        let notif = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`Kamu sekarang memulai menghitung message dengan total message adalah ${mmax} message!`)
        .setFooter('Bot akan memberikan DM apabila perhitungan message telah selesai!')
        message.channel.send({ embed: notif }).then((m) => m.delete({ timeout: 10000 }));
        message.delete();
    } catch (err) {
        console.log(err);
        return;
    }
  }
};