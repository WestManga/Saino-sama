const { Message } = require("discord.js")
const blacklist = require('../../models/blacklist')


module.exports = {
  name:'blacklist',
  category:'moderation',
  description:'Memblacklist member dari menggunakan command',
  usage:'<id member>',
  cooldown:1,
  run: async(client, message, args) => {
        if(message.author.id !== '338418945620967434') return message.channel.send("This is owner only command.")
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("User is not valid.")
     
          blacklist.findOne({ id : User.user.id }, async(err, data) => {
          if(err) throw err;
          if(data) {
              message.channel.send(`**${User.displayName}** has already been blacklisted`)
          } else {
              data = new blacklist({ id : User.user.id })
              data.save()
              .catch(err => console.log(err))
            message.channel.send(`**${User.displayName}** has been added to blacklist`)
            }
        })
    }
};