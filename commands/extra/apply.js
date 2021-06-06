const { Client, Message, MessageEmbed } = require("discord.js");
const Guild = require("../../models/Guild");

module.exports = {
  name:'apply',
  category:'extra',
  description:'Membuat pendaftaran sebagai ...',
  aliases:['daftar', 'daftarmod'],
  cooldown:1000,
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(client, message, args) => {
    let dataguild = await Guild.findOne({
        guildID: message.guild.id
    });

    if (dataguild.active.apply === false) {
        message.delete()
        return message.channel.send('Pendaftaran staff sedang ditutup. Ditunggu ya~');
    }

      const questions = [
          "Siapa nama asli kamu?",
          "Dimana tempat tinggal kamu saat ini?",
          "Berapakah umur kamu saat ini?",
          "Apa alasan kamu ingin bergabung menjadi Advisor?",
          "Apakah sebelumnya kamu mempunyai pengalaman sebagai Advisor/Moderator/Sejenisnya di server lain?",
          "Sebutkan salah satu keunggulan dari diri kamu",
      ];
    
    let collectCounter = 0;
    let endCounter = 0;

    const filter = (m) => m.author.id === message.author.id;

    const appStart = await message.author.send(questions[collectCounter++]);
    const channel = appStart.channel;

    const collector = channel.createMessageCollector(filter);

    collector.on("collect", () => {
        if (collectCounter < questions.length) {
            channel.send(questions[collectCounter++]);
        } else {
            channel.send("Form pendaftaran yang kamu isi sudah dikirimkan kepada Admin");
            collector.stop("fulfilled");
        }
    });
      
    const appChannel = client.channels.cache.get('793014859402051625');
    collector.on('end', (collected, reason) => {
        if (reason === "fulfilled") {
            let index = 1;
            const mappedResponses = collected.map((msg) => {
                return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`;
            })
            .join("\n\n");

            appChannel.send(
                new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTitle('Laporan Baru')
                .setDescription(mappedResponses)
                .setTimestamp()
            )
        }
    });
    },
};