const Discord = require("discord.js");
const Guild = require("../../models/Guild");

module.exports = {
  name:'enable',
  category:'admin',
  description:'Enable command',
  usage:'enable <args>',
  cooldown:1000,
  run: async(client, message, args) => {
        let author = message.guild.members.cache.get(message.author.id);
        if (!author.hasPermission('MANAGES_ROLES')) return message.channel.send("You dont have permission for used this command!");
        try {
            let dataguild = await Guild.findOne({
                guildID: message.guild.id
            });

            let cmd = args[0].toLowerCase();
            if (!cmd) {
                return message.channel.send('Argument tidak boleh kosong\nPilih `welcome` atau `bye`');
            }

            let prefix = dataguild.prefix;

            let welcomechannel = dataguild.welcomeChannel;
            if (!welcomechannel) {
                return message.channel.send(`Please set first welcome channel with ${prefix}setch welcome`);
            }

            let byechannel = dataguild.byeChannel;
            if (!byechannel) {
                return message.channel.send(`Please set first welcome channel with ${prefix}setch bye`);
            }

            let value = true;

            if (cmd === 'welcome') {
                if (dataguild.active.welcome === true) {
                    return message.channel.send('Welcome message telah diaktifkan lho~');
                }
        
                dataguild.active.welcome = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Welcome message diaktifkan!')
                })
            } else
            if (cmd === 'bye') {
                if (dataguild.active.bye === true) {
                    message.delete();
                    return message.channel.send('Bye message telah diaktifkan lho~');
                }
        
                dataguild.active.bye = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Bye message diaktifkan!')
                })
            } else
            if (cmd === 'apply') {
                if (dataguild.active.apply === true) {
                    message.delete();
                    return message.channel.send('Pendaftaran moderator memang sudah dibuka lho..');
                }
        
                dataguild.active.apply = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Pendaftaran moderator telah dibuka!')
                })
            } else
            if (cmd === 'convert') {
                if (dataguild.active.convert === true) {
                    message.delete();
                    return message.channel.send('Saat ini penukaran sedang dibuka!');
                }
        
                dataguild.active.convert = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Penukaran saat ini telah dibuka kembali, silahkan melakukan penukaran!')
                })
            } else
            if (cmd === 'give') {
                if (dataguild.active.give === true) {
                    message.delete();
                    return message.channel.send('Transfer saldo ke sesama member sedang di buka');
                }

                dataguild.active.give = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Transfer saldo ke sesama member saat ini dibuka')
                })
            }
        } catch (err) {
        console.log(err)
        return message.channel.send(`Wah kayanya error nih bos..`);
        }
    },
};