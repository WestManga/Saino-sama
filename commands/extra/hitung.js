const Discord = require("discord.js")
const math = require('mathjs');
const { random } = require('mathjs');

module.exports = {
  name:'hitung',
  category:'extra',
  description:'Menghitung angka yang di inginkan',
  usage:'hitung 5*5',
  aliases:['itung', 'calc'],
  cooldown:5,
  run: async(client, message, args) => {

    const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;

    if(!args[0]) return message.channel.send(`Tolong di isi dulu yang mau dihitung`);

    let resp;

    try {
        resp = math.evaluate(args.join(" "))
    } catch (e) {
        return message.channel.send(`Tolong gunakan agrumen yang valid`)
    }

    const embed = new Discord.MessageEmbed()
    .setColor(roleColor)
    .setTitle('Kalkulator')
    .addField('Pertanyaan', `\`\`\`css\n${args.join(' ')}\`\`\``)
    .addField('Jawaban', `\`\`\`css\n${resp}\`\`\``)

    message.channel.send(embed);
  }
};