const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
  name:'lapor',
  category:'extra',
  description:'Membuat laporan manga error atau sejenisnya tentang manga di WestManga',
  aliases:[''],
  cooldown:1000,
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(client, message, args) => {
      const questions = [
          "Manga apa yang error?",
          "Berapa chapter yang error?",
          "Linknya?"
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
            channel.send("Laporan sudah dibuat, tunggu sampai Admin merespon laporan kamu.");
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