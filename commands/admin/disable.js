const Discord = require("discord.js");
const Guild = require("../../models/Guild");

module.exports = {
  name:'disable',
  category:'admin',
  description:'Disable command',
  usage:'disable <args>',
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

            let value = false;

            if (cmd === 'welcome') {
                if (dataguild.active.welcome === false) {
                    return message.channel.send('Welcome message memang sudah tidak aktif lho~');
                }
        
                dataguild.active.welcome = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Welcome message dinonaktifkan!')
                })
            } else
            if (cmd === 'bye') {
                if (dataguild.active.bye === false) {
                    message.delete();
                    return message.channel.send('Bye message memang sudah tidak aktif lho~');
                }
        
                dataguild.active.bye = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Bye message dinonaktifkan!')
                })
            } else
            if (cmd === 'apply') {
                if (dataguild.active.apply === false) {
                    message.delete();
                    return message.channel.send('Pendataran memang belum dibuka lho~');
                }
        
                dataguild.active.apply = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Pendaftaran moderator telah ditutup!')
                })
            } else
            if (cmd === 'convert') {
                if (dataguild.active.convert === false) {
                    message.delete();
                    return message.channel.send('Penukaran saldo memang belum dibuka!');
                }
        
                dataguild.active.convert = value;
                dataguild.save().then(() => {
                    message.delete()
                    message.channel.send('Penukaran saldo saat ini ditutup karena slot penuh!')
                })
            }
        } catch (err) {
        console.log(err)
        return message.channel.send(`Wah kayanya error nih bos..`);
        }
    },
};