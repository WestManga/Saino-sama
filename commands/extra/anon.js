const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
  name:'anon',
  category:'extra',
  description:'Membuat posting di sharing cerita secara anonymous',
  aliases:[''],
  cooldown:1,
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(client, message, args) => {
      const question = [
          "Apa yang ingin kamu ceritakan saat ini?",
      ];
    
    let collectCounter = 0;
    let endCounter = 0;

    const filter = (m) => m.author.id === message.author.id;

    const appStart = await message.author.send(question[collectCounter++]);
    const channel = appStart.channel;

    const collector = channel.createMessageCollector(filter);

    collector.on("collect", () => {
        if (collectCounter < questions.length) {
            channel.send(question[collectCounter++]);
        } else {
            channel.send("Cerita kamu sudah dikirimkan");
            collector.stop("fulfilled");
        }
    });
      
    const appChannel = client.channels.cache.get('824170183916388353');
    collector.on('end', (collected, reason) => {
        if (reason === "fulfilled") {
            let index = 1;
            const mappedResponses = collected.map((msg) => {
                return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`;
            })
            .join("\n\n");

            appChannel.send(
                new MessageEmbed()
                .setAuthor(`Anonymous`)
                .setTitle('Cerita Anon')
                .setDescription(mappedResponses)
                .setTimestamp()
            )
        }
    });
    },
};