const Discord = require("discord.js");
const coupon = require("../../models/coupon");

module.exports = {
    name: 'owner-coupon',
    category: 'coupon',
    description: 'Buat kupon baru',
    usage: '<kode> <nominal>',
    aliases: ['okode', 'ownercc', 'occ'],
    ownerOnly: true,
    cooldown: 1000,
    run: async (client, message, args) => {
        try {
            await message.delete()
            let author = message.guild.members.cache.get(message.author.id);
            if (message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.");
            let kode = args[0];
            if (!kode) {
                return message.channel.send('Kode tidak dapat kosong')
            };

            let nominal = args[1];
            if (!nominal) {
                return message.channel.send('Nominal tidak boleh kosong')
            };
            if (nominal < 1000) {
                return message.channel.send('Nominal tidak boleh kurang dari 1000')
            };
            if (isNaN(nominal)) {
                return message.channel.send('Nominal hanya boleh berupa angka!')
            };

            let now = new Date();

            coupon.findOne({ guildID: message.guild.id, Code: kode }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    data = new coupon({
                        guildID: message.guild.id,
                        Createdby: message.author.username,
                        Code: kode,
                        Nominal: nominal,
                        Created: now,
                        Claimed: false,
                        userClaimed: ''
                    })
                } else {
                    const obj = {
                        guildID: message.guild.id,
                        Createdby: message.author.username,
                        Code: kode,
                        Nominal: nominal,
                        Created: now,
                        Claimed: false,
                        userClaimed: ''
                    }
                    data.push(obj)
                }
                data.save()
                message.channel.send('Your coupon has created!')
                author.send(new Discord.MessageEmbed()
                    .setTitle('New Coupon has been Created!')
                    .setColor(process.env.COLOR)
                    .addField('Kode', `${data.Code}`, true)
                    .addField('Amount', `Rp. ${data.Nominal}`, true)
                    .addField('Created Date', `${data.Created}`)
                    .setFooter(`${message.guild.name}`)
                    .setTimestamp()
                )
            });
        } catch (err) {
            console.log(err)
            return;
        }
    }
};