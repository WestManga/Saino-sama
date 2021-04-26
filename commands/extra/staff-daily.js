const { Client, Message, MessageEmbed} = require("discord.js");
const Guild = require("../../models/Guild");
const User = require("../../models/User");
const { COLOR } = process.env;

module.exports = {
  name:'staff-daily',
  category:'extra',
  description:'Claim harian untuk mendapatkan point',
  usage:'',
  aliases:['sdaily'],
   /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @returns 
   */
  run: async(client, message, args) => {
    await message.delete()
    const member = message.author
    const authorId = message.author.id
    const guildo = message.guild.id
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command.').then(m => m.delete({ timeout : 5000 }))

    let user = await User.findOne({
      guildID: message.guild.id,
      userID: message.author.id,
    });

    let data = await Guild.findOne({
      guildID: message.guild.id,
    });

    const now = new Date()

    // KALAU DELAY
    if (user.lastpayday) {
      const then = new Date(user.lastpayday)

          const diff = now.getTime() - then.getTime()
          const diffHours = Math.round(diff / (1000 * 60 * 60))

          const hours = 24

          //embed notif
          let doneEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `Kamu hanya dapat mengambil gaji staff selama ${hours} jam sekali.`,
                );
          if (diffHours <= hours) {
            message.channel.send(doneEmbed)
            return
          }
    }
    
    let gaji = 1
    user.point += gaji;
    user.lastpayday = now;
    

    const gaji1 = new MessageEmbed()
    .setColor(COLOR)
    .setDescription(`Selamat ${message.author.username} mendapatkan point dari gaji harian staff sebanyak **${gaji} Point**\nSaat ini jumlah point yang kamu punya adalah **${user.point} Point!**`)
    .setFooter(`Kamu dapat claim lagi dalam waktu 24 Jam`)
    .setTimestamp()
    message.channel.send(gaji1);
    user.save();

    const modlog = client.channels.cache.get(data.modlogChannel);
    let notifembed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(`<:woow:819857034517676032> Staff Daily!`)
			.setDescription(`**User:** ${message.author}\n**UserID:** ${message.author.id}\n**Get Point:** 1 Point\nThey now have ${user.point} Point`)
      .setTimestamp()
			modlog.send({embed : notifembed});
  }
};