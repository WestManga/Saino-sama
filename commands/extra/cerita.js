const Discord = require("discord.js")
const { COLOR } = process.env;

module.exports = {
  name:'cerita',
  category:'extra',
  description:'Membuat cerita sebagai anonymous',
  usage:'',
  aliases:[''],
  cooldown:1000,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(client, message, args) => {
    await message.delete()
    let data = await Guild.findOne({
        guildID: message.guild.id
    });
    const questions = [
        "Ayo ceritakan yang mau kamu ceritakan.. tenang aja aku nggakan bilang siapa-siapa kok..",
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
            channel.send("Cerita akan disubmit!");
            collector.stop("Terisi");
        }
    });

    //Send embed
    const appChannel = client.channels.cache.get(data.storyChannel);
    collector.on('end', (collected, reason) => {
        if (reason === "Terisi") {
            const mappedResponses = collected.map((msg) => {
                return `Ceritaku adalah...\n${msg.content}`
            })
            appChannel.send(
                new Discord.MessageEmbed()
                .setTitle("Anonymous Story")
                .setColor(COLOR)
                .setDescription(mappedResponses)
                .setTimestamp()
            )
        }
    });
  },
};