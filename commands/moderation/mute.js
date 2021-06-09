const { Message, MessageEmbed } = require("discord.js");
const db = require('quick.db');
const Guild = require("../../models/Guild");
const User = require('../../models/User');

module.exports = {
  name:'mute',
  category:'moderation',
  description:'Membisukan member',
  usage:'<member>',
  aliases:['bisu'],
  /**
   * 
   * @param {Message} message 
   */
  run: async(client, message, args) => {
        try {
            let author = message.guild.members.cache.get(message.author.id);
            if (!author.hasPermission('MANAGES_ROLES')) return message.channel.send("You dont have permission for used this command!");

            let guildava = message.guild.iconURL({
                size: 4096,
                dynamic: true,
              });

            let guildname = message.guild.name;
       
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!target) return message.channel.send("Member is not found.");

            // Check target //
            if (target.hasPermission("BAN_MEMBERS")) 
                return message.channel.send("I do not have permission to muted Administrator");
            if (target.user.id == author) 
                return message.reply("You idiot? why you mute your self? Masokis? Ba-baka!");
            if (message.member.roles.highest.position <= target.roles.highest.position)
                return message.channel.send('Tidak sopan untuk mute seseorang yang lebih tinggi daripada kamu..');

            let reason = args.slice(1).join(' ');
            if (!reason) reason = "Tidak ada alasan";
        
            // Get data from Guild.modules //
            let data = await Guild.findOne({
                guildID: message.guild.id
            });

            let datauser = await User.findOne({
                guildID: message.guild.id,
                userID: target.user.id,
            });

            if(!datauser.muted) {
                await User.findOneAndUpdate({
                    userID: target.user.id,
                    guildID: message.guild.id,
                },
                {
                muted: 1
                })
            }

            // Check Muted Roles //
            const muteRole = message.guild.roles.cache.get(data.mutedRole)
            if (!muteRole) {
                return message.channel.send(
                    `You not set muted role. Please use command ${data.prefix}setmutedroles for setting muted roles!`
                );
            }

            // Check member if already muted //
            if (target.roles.cache.has(muteRole.id))
                return message.channel.send('This user is already muted!');

            // Check Ruang Pendidikan //
            const ruangBK = client.channels.cache.get(data.ruangbk);
            if (!ruangBK) {
                return message.channel.send(
                    `Ruang BK not found. Set first use ${data.prefix}setch ruangbk`
                );
            }

            // Check modlog-channel //
            const modlog = client.channels.cache.get(data.modlogChannel);
            if (!modlog) {
                return message.channel.send(
                    `Modlog not found. Set first use ${data.prefix}setch modlog`
                );
            }
        
            // Simpen data //
            let dataquick = new db.table('Mutes')
            await dataquick.set(target.user.id, target._roles)
            console.log('Saving to quick.db completed');

            // Takes member Roles //
            for (let i = 0; i < target._roles.length; i++) {
                target.roles.remove(target._roles[i])
            }

            // HITUNGAN DENDA/FINED
            const fmin = data.fined.min
            const fmax = data.fined.max
            let totalmute = datauser.muted

            let denda = Math.floor(Math.random() * (fmax - fmin + 1) + fmin + 1000 * totalmute);

            // Give mutedroles //
            await target.roles.add(muteRole).then(() => {
                message.delete()
                message.channel.send(`**${target.user.tag}** telah dimute\nAlasan: ${reason}\nDenda sebesar: Rp.${denda}`).then(d => d.delete({ timeout : 20000 }))
                datauser.money -= denda;
                datauser.muted++;
                datauser.save();
            })
            
            target.send(new MessageEmbed()
            .setAuthor(guildname, guildava)
            .setTitle(`Kamu mendapatkan Muted di server ${guildname}`)
            .setDescription(
                `Tolong untuk mengikuti peraturan server yang berlaku agar terhindar dari kesalahan dan dapat menyebabkan kamu dikeluarkan dari server ${guildname}
                Saat mendapatkan mute kamu hanya akan ada didalam ruang penjara dan akan mendapatkan bimbingan dari moderator server ${guildname}
                Moderator tidak akan mengeluarkan kamu sampai kamu mengerti dan tidak akan mengulanginya lagi.`
                )
            .addField("Moderator", author.nickname)
            .addField("Denda", `Rp. ${denda}`)
            .addField("Alasan", `\`\`\`${reason}\`\`\``)
            .setColor("RED")
            .setTimestamp()
            )
            
            // Send embed to modlog //
            let embedmodlog = new MessageEmbed()
                .setAuthor(`NEW MUTED`)
                .setColor("YELLOW")
                .addField("User", target, true)
                .addField("Moderator", message.author, true)
                .addField("Denda", `\`\`\`Rp.${denda}\`\`\``)
                .addField("Reason", `\`\`\`${reason}\`\`\``)
                .setTimestamp()
                .setFooter(`${message.member.id}`, message.guild.iconURL())
            modlog.send({ embed: embedmodlog});
            
            // Send message to RuangBK //
            ruangBK.send(`Halo **${target}**, Selamat datang di <#${data.ruangbk}>\nMember yang ada disini hanyalah member yang sedang di mute yang berarti dia telah melanggar peraturan. Hubungi Admin/Moderator untuk mendapatkan bantuan!\nMember mendapatkan mute karena ${reason}`);
        } catch (error) {
            console.log(error);
            return message.channel.send(`Wah kayanya error nih bos..`);
        }
    }
}