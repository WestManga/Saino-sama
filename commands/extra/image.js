const image = require("images-scraper")

const google = new image({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
  name:'image',
  category:'extra',
  description:'Mencari image di google',
  usage:'image <judul>',
  aliases:['foto'],
  cooldown:2,
  run: async(client, message, args) => {
      const query = args.join(" ")
      if(!query) return message.channel.send('Tolong masukan judul gambar yang ingin dicari')

      const result = await google.scrape(query, 1)
      message.channel.send(result[0].url);
    }
};