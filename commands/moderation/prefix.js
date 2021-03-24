const { Message } = require("discord.js");
const prefix = require("../../models/prefix");
const prefixSchema = require('../../models/prefix')

module.exports = {
  name:'prefix',
  category:'moderation',
  description:'Mengubah Prefix Server',
  usage:'<custom prefix>',
  aliases:['setp'],
  cooldown:10,
    /**
    * @param {Message} message
     */
  run: async(client, message, args) => {
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to.')
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                prefixSchema.findOneAndUpdate({ Guild : message.guild.id })
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Your prefix has been update to **${res}**`)
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Custom prefix in this server is now set to **${res}**`)
            }
        })
  }
};