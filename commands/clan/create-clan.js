const Discord = require("discord.js");
const clandb = require('../../models/clan');

module.exports = {
  name:'create-clan',
  category:'clan',
  description:'Membuat clan baru',
  usage:'<clan name>',
  aliases:[''],
  cooldown:1000,
  run: async(client, message, args) => {
    try {
        let clanname = args.join(" ");
        if (!clanname) {
            return message.channel
            .send("Nama clan tidak boleh kosong")
            .then((m) => m.delete({ timeout: 5000 }));
        }

        if (clanname.length > 30) {
            message.reply('Nggaboleh lebih dari 30 huruf!')
        }

        // CHECK MEMBER HAVE CLAN //
        clandb.findOne({ userID: message.author.id }, async(err, res) => {
            if (err) throw err;
            if (res) return message.reply('Lu udah punya guild!')
        });

        // Create CLAN //
        clandb.findOne({ userID: message.author.id }, async(err,data) => {
            if(err) throw err;
            if(!data) {
                data = new clandb({
                    clanname: clanname,
                    userID: message.author.id,
                    leadername: message.author.username,
                    createDate: new Date(),
                    member : [
                        {
                            userID: message.author.id,
                            username: message.author.username,
                            Rank: "Leader",
                        }
                    ]
                })
            } else {
                const obj = {
                    clanname: clanname,
                    userID: message.author.id,
                    leadername: message.author.username,
                    createDate: new Date(),
                }
                
                const mem = {
                    userID: message.author.id,
                    username: message.author.username,
                    Rank: "Leader",
                }
                data.push(obj, mem)
            }
            data.save()
        });

        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Kamu berhasil membuat sebuah clan dengan nama ${clanname}`)
            .setColor(client.warna.success)
            .setAuthor(message.author.username, message.author.avatarURL({ size: 4096 }))
        )
    }catch(err) {
        console.log(err);
        return;
    }
  }
};