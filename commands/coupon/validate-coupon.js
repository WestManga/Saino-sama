const Discord = require("discord.js");
const coupon = require("../../models/coupon");
const moment = require('moment');

module.exports = {
    name: 'validate-coupon',
    category: 'coupon',
    description: 'check coupon',
    usage: '<coupon code>',
    aliases: ['checkkode','ckode','ccoupon'],
    ownerOnly: true,
    cooldown: 1000,
    run: async (client, message, args) => {
        try {
            await message.delete()
            if (message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.");
            let kode = args.join(' ');
            if (!kode) {
                return message.channel.send('Kode tidak boleh kosong')
            };

            coupon.findOne({ guildID: message.guild.id, Code: kode }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    return message.channel.send('Kode yang kamu cari tidak ada');
                } else
                    if (data) {
                        let createddate = moment
                            .utc(data.Created)
                            .format("dddd, MMMM Do YYYY");
                        let claimdate = moment
                        .utc(data.DateClaimed)
                        .format("dddd, MMMM Do YYYY");
                        let embeddata = new Discord.MessageEmbed()
                            .setColor(process.env.COLOR)
                            .setDescription('There is coupon details')
                            .addField('Code', `${data.Code}`, true)
                            .addField('Amount', `${data.Nominal}`, true)
                            .addField('Created by', `${data.Createdby}`)
                            .addField('Create Date', `${createddate}`)
                            .addField('Claimed', `${data.Claimed || `Not Claimed`}`, true)
                            .addField('User Claimed', `${data.userClaimed || `Unknown`}`, true)
                            .addField('Date Claimed', `${claimdate || `Not Claimed`}`)
                        message.channel.send({ embed: embeddata });
                    }
            });
        } catch (err) {
            console.log(err)
            return;
        }
    }
};