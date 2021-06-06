const Discord = require('discord.js')
const db = require('quick.db')
const { COLOR } = process.env;

module.exports = async (client, message) => {
    let afk = new db.table('AFKs'),
        authorstatus = await afk.fetch(message.author.id),
        mentioned = message.mentions.members.first();

    if (mentioned) {
        let status = await afk.get(`${mentioned.id}.alasan`);
        let waktu = await afk.get(`${mentioned.id}.time`)

        let msTos = Date.now() - waktu
        let since = client.util.parseDur(msTos)
        if (status) {
            let estatus = new Discord.MessageEmbed()
            .setColor(COLOR)
            .setDescription(`**${mentioned.user.tag}** saat ini sedang AFK - **${since}** lalu\nSedang ${status}`, { disableMentions: 'all' })
            message.channel.send({ embed: estatus }).then(
                d => d.delete({ timeout: 15000 })
            );
        }
    };

    if (authorstatus) {
        message.reply(`Selamat datang kembali!`).then(
            d => d.delete({ timeout: 10000 })
        )
        await afk.delete(message.author.id)
    };
}