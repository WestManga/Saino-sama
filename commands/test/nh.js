const { MessageEmbed } = require("discord.js")
const nHentaiAPI = require("nana-api");
let api = new nHentaiAPI();

module.exports = {
  name:'nh',
  category:'test',
  description:'nhentai dah pokoknya',
  usage:'code',
  aliases:['nhentai'],
  cooldown:1000,
  run: async(client, message, args) => {
        if (!message.channel.nsfw) return;
      
        if (!args[0])
            return message.channel
            .send(
                `the command you are using is incorrect\nExample: \`nh search <Query> [language]\``
            ).then(message => message.delete({ timeout: 10000 }));
  
        let nick = message.member.nickname !== null
        ? `${message.member.nickname}`
        : message.author.username;

        let input = args.join(" ").match(/\w+|('|")([^"]|[^'])+('|")/g);
        let search = input[0].replace(/["']/g, "").toLowerCase();
        let patt = /^\d+$/;

        if (patt.test(search))
        return message.channel.send(
            `You can use \`nh read ${search}\` to search with ID`
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
  
        if (!client.config.LANG.includes(lang.toLowerCase()))
            return message.channel
            .send("Available langauge is `English`, `Japanese` & `Chinese`")
            .then(message => message.delete({ timeout: 5000 }));

        let numPages = await api.search(search);
        
        // console.log(numPages);
        if (!numPages.results || numPages.results.length == 0)
            return message.channel.send(`No doujin found with query \`${search}\``);
  
        // if total pages is only one, no need to use api again
        if (numPages.num_pages == 1) {
            let query = numPages.results.filter(x => x.language == lang.toLowerCase());
            if (query.length == 0)
            return message.channel
            .send(
                `No book found with language **${lang}**, please try using another language!`
            ).then(message => message.delete({ timeout: 6000 }));
    
        let rand = client.util.getRandInt(query.length);
        await client.embeds.getInfoEmbed(query[rand].id, message);
        return;
        }
    
      try {
        let id = await api.search(
            search,
            client.util.getRandInt(numPages.num_pages)
        );
        let langs = id.results.map(x => x.language == lang.toLowerCase() && x.id);
        if (langs.every((val, i, arr) => val === arr[0]))
            return msg.channel
            .send(`No book found with language **${lang}**, please try again or try using another language`)
            .then(msg => msg.delete({ timeout: 6000 }));
          
        let query = id.results.find(x => x.language == lang.toLowerCase()).id;
        await client.embeds.getInfoEmbed(query, msg);
      } catch(err) {
          console.log(err.message);
          return;
      }
    }
};