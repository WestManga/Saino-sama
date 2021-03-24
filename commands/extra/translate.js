const translate = require("translate-google")

module.exports = {
  name:'translate',
  category:'extra',
  description:'Google translate ke english',
  usage:'<kata yang ingin di translate>',
  aliases:['tl'],
  cooldown:5,
  run: async(client, message, args) => {
      translate(args.join(" "), {to : 'en'}).then(res => {
          message.channel.send(res)
      }).catch(err => {
          message.channel.send('An error has occured')
          console.log(err)
      })
    }
};