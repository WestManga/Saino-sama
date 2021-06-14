const Discord = require("discord.js");
const coupon = require("../../models/coupon");
const User = require('../../models/User');

module.exports = {
    name: 'admin-coupon',
    category: 'coupon',
    description: 'Buat kupon baru',
    usage: '<kode> <nominal>',
    aliases: ['adcc','admincc'],
    ownerOnly: true,
    cooldown: 1000,
    run: async (client, message, args) => {
        try {
            await message.delete()
            let owner = message.guild.members.cache.get(process.env.OWNER);
            let author = message.guild.members.cache.get(message.author.id);
            if (!author.hasPermission('BAN_MEMBERS')) return message.channel.send("You dont have permission for used this command!");

            let kode = args[0];
            if (!kode) {
                return message.channel.send('Kode tidak dapat kosong')
            };

            let nominal = args[1];
            if (!nominal) {
                return message.channel.send('Nominal tidak boleh kosong')
            };
            if (nominal < 100) {
                return message.channel.send('Nominal tidak boleh kurang dari 100')
            };
            if (isNaN(nominal)) {
                return message.channel.send('Nominal hanya boleh berupa angka!')
            };

            let now = new Date();

            let userdata = await User.findOne({
                guildID: message.guild.id,
                userID: message.author.id,
            });
            let saldo = userdata.money;
            if (saldo < nominal) {
                return message.channel.send(`Saldomu kurang untuk membuat kupon senilai Rp.${nominal}`);
            } else
            if (saldo > nominal) {
                userdata.money -= nominal;
                userdata.save();
            }

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
                owner.send(new Discord.MessageEmbed()
                    .setTitle('New Coupon has been Created!')
                    .setColor(process.env.COLOR)
                    .addField('Creator', `${message.author}`)
                    .addField('Kode', `${data.Code}`, true)
                    .addField('Amount', `Rp. ${data.Nominal}`, true)
                    .addField('Created Date', `${data.Created}`)
                    .setFooter(`${message.guild.name}`)
                    .setTimestamp()
                )
                author.send(new Discord.MessageEmbed()
                    .setTitle('New Coupon has been Created!')
                    .setColor(process.env.COLOR)
                    .addField('Creator', `${message.author}`)
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