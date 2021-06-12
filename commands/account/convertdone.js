const { MessageEmbed } = require("discord.js");
const db = require('../../models/convert');

module.exports = {
  name:'convertdone',
  category:'account',
  description:'Accept',
  usage:'<account>',
  aliases:[''],
  cooldown:1000,
  run: async(client, message, args) => {
    await message.delete()
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.channel.send('Please Mention A User');
    let avatar = member.user.displayAvatarURL({ size: 4096, dynamic: true });
    let guildname = message.member.guild.name;
    let guildavatar = message.guild.iconURL({ size: 4096, dynamic: true });

	if	(message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.")  

    try {
        let dataguild = await Guild.findOne({
            guildID: message.guild.id
        });

        let convertch = client.channels.cache.get(dataguild.convertChannel);
        if (!convertch) {
            return message.channel.send(
                `Channel convert not found! please set first with ${dataguild.prefix}setch convertch`
            );
        }

        db.findOne({ guildID : message.guild.id, userID: member.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.convertdata.splice(number, 1)
                message.channel.send('Sukses mengubah data').then(m => m.delete({ timeout : 1000 }))
                data.save()

                let embed = new MessageEmbed()
                .setAuthor(`${member.user.tag}`, avatar)
                .setDescription(`Sukses mengirim permintaan convert!`)
                .setColor("BLUE")
                .addField("Kepada", member, true)
                .addField("Moderator", message.author, true)
                .setTimestamp()
                .setFooter(`${guildname}`, guildavatar);
                convertch.send(embed);

                member.send(new MessageEmbed()
                .setAuthor(guildname, guildavatar)
                .setColor('BLUE')
                .setDescription(`Permintaan request convert kamu telah dikirimkan!\nDitunggu yang selanjutnya! Keep chatting!!`)
                .setTimestamp()
                );
            } else {
                message.channel.send('Member ini tidak punya request convert!').then(m => m.delete({ timeout : 1000 }))
            }
        })
    } catch(err) {
        console.log(err);
        return;
    }
  }
};