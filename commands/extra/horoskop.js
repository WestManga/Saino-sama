const Discord = require("discord.js")
const { COLOR, PREFIX } = process.env;

module.exports = {
  name:'horoskop',
  category:'extra',
  description:'Melihat horoskopmu hari ini',
  usage:'<nama horoskop>',
  aliases:['horo', 'zodiac'],
  cooldown:10000,
  run: async(client, message, args) => {
    try {
      // let list = [ "aries", "taurus","gemini", "cancer","leo","virgo","libra","scorpio","sagitarius","kaprikornus","aquarius","pisces" ];
      
      let query = args[0].toLowerCase();
      if (query === "help") {
        let errorembed = new Discord.MessageEmbed()
        .setTitle(`This is zodiac list!`)
        .setColor(COLOR)
        .setDescription(
          `<:aries:851337010664308736> Aries
          <:akuarius:851337010521833482> Akuarius
          <:cancer:851337010752389170> Cancer
          <:gemini:851337010802589716> Gemini
          <:karpikornus:851337010848858143> Karpikornus
          <:leo:851337010923962387> Leo
          <:libra:851337010878218260> Libra
          <:pisces:851337011017285652> Pisces
          <:sagitarius:851337011147046922> Sagitarius
          <:scorpio:851337011091734588> Scorpio
          <:taurus:851337011041140737> Taurus
          <:virgo:851337011343785998> Virgo
          `
        )
        .addField(`<a:kanan:819853363179945994> Cara menggunakan`, `Gunakan command ${PREFIX}horo <nama zodiac>\n**Contoh:** ${PREFIX}horo aries`)
        message.channel.send({ embed: errorembed });
        return;
      }
        await client.horoskop.getDetailToday(query, message);
      
    } catch (error) {
        return console.log(error);
        // Restart the bot as usual. 
    }
  }
};