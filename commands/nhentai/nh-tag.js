const { MessageEmbed } = require("discord.js")
const nHentaiAPI = require("nana-api");
let api = new nHentaiAPI();

module.exports = {
  name:'nh-tag',
  category:'test',
  description:'nhentai dah pokoknya',
  usage:'<query>',
  aliases:['nh-genre','nht'],
  cooldown:1000,
  run: async(client, msg, args) => {
        if (!msg.channel.nsfw) return;
      
        if (!args[0]) {
            let errorembed = new MessageEmbed()
            .setDescription(`Command yang kamu gunakan salah!\nContoh: \`nh-tag <Query>\``)
            .setColor(process.env.COLOR)
            msg.channel.send({ embed: errorembed }).then(msg => 
                msg.delete({ timeout: 10000 }));
            return; 
        }
            
        let input = args.join(" ").match(/\w+|('|")([^"]|[^'])+('|")/g);
        let tag = input[0].replace(/["']/g, "").toLowerCase();
        let patt = /^\d+$/;

        if (patt.test(tag))
        return msg.channel.send(
            `You can use \`nh ${tag}\` untuk mencari dengan ID`
        );

        let lang = input[1];
        if (!lang) lang = "english";
        if (lang == "ch") {
            lang = "chinese";
        } else if (lang == "en") {
            lang = "english";
        } else if (lang == "jp") {
            lang = "japanese";
        }

        let numPages = await api.tag(tag);
        
        // console.log(numPages);
        if (!numPages.results || numPages.results.length == 0)
            return msg.channel.send(`Tidak ada doujin dengan keyword \`${tag}\``);
  
        // if total pages is only one, no need to use api again
        if (numPages.num_pages == 1) {
            let query = numPages.results.filter(x => x.language == lang.toLowerCase());
            if (query.length == 0)
            return msg.channel
            .send(
                `No book found with language **${lang}**, please try using another language!`
            ).then(msg => msg.delete({ timeout: 6000 }));
    
        let rand = client.hentaiutil.getRandInt(query.length);
        await client.hentaiembed.getInfoEmbed(query[rand].id, msg);
        return;
        }
    
      try {
        let id = await api.tag(
            tag,
            client.hentaiutil.getRandInt(numPages.num_pages)
        );
        let langs = id.results.map(x => x.language == lang.toLowerCase() && x.id);
        if (langs.every((val, i, arr) => val === arr[0]))
            return msg.channel
            .send(`No book found with language **${lang}**, please try again or try using another language`)
            .then(msg => msg.delete({ timeout: 6000 }));
          
        let query = id.results.find(x => x.language == lang.toLowerCase()).id;
        await client.hentaiembed.getInfoEmbed(query, msg);
      } catch(err) {
          console.log(err.msg);
          return;
      }
    }
};