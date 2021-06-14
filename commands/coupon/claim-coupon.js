const Discord = require("discord.js");
const coupon = require('../../models/coupon');
const User = require('../../models/User');

const addMoney = async (userID, guildID, money = 0) => {
    await User.findOneAndUpdate(
        {
            userID,
            guildID,
        },
        {
            userID,
            guildID,
            $inc: {
                money
            },
        },
        {
            upsert: true
        }
    );
};

module.exports = {
    name: 'claim-coupon',
    category: 'coupon',
    description: 'Claimed coupon',
    usage: '<kode>',
    aliases: ['cc', 'claim'],
    cooldown: 1000,
    run: async (client, message, args) => {
        try {
            let owner = message.guild.members.cache.get(process.env.OWNER);
            let kode = args[0];
            if (!kode) {
                return message.channel.send('Kamu wajib memasukan kodenya..')
            };

            let now = new Date();

            coupon.findOne({ guildID: message.guild.id, Code: kode }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    return message.channel.send('Kode yang kamu masukan tidak valid');
                }
                if (data.Claimed == true) {
                    return message.channel.send('Kode yang masukan sudah diclaim sebelumnya..');
                } else
                    if (data.Claimed == false) {
                        let datauser = await User.findOne({
                            guildID: message.guild.id,
                            userID: message.author.id,
                        });

                        data.userClaimed = message.author.username;
                        data.Claimed = true;
                        data.DateClaimed = now;
                        data.save();

                        let amount = data.Nominal;
                        await addMoney(message.author.id, message.guild.id, amount);
                        let prefix = await client.guildhandler.prefix(message.guild.id);

                        let newembed = new Discord.MessageEmbed()
                            .setColor(process.env.COLOR)
                            .setDescription(`Kode yang kamu masukan valid..\nKamu mendapatkan saldo senilai Rp.${data.Nominal}`)
                            .setFooter(`Check your balance with ${prefix}bal`)
                            .setTimestamp()
                        message.channel.send({ embed: newembed })

                        owner.send(new Discord.MessageEmbed()
                            .setTitle('New Coupon has been Claimed!')
                            .setColor(process.env.COLOR)
                            .addField('Kode', `${data.Code}`, true)
                            .addField('Amount', `Rp. ${data.Nominal}`, true)
                            .addField('Claimed by', `${data.userClaimed}`)
                            .addField('Coupon Creator', `${data.Createdby}`, true)
                            .addField('Claimed date', `${data.DateClaimed}`)
                            .setFooter(`${message.guild.name}`)
                            .setTimestamp()
                        )
                    }
            });

        } catch (err) {
            console.log(err)
            return;
        }
    }
};