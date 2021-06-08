const { Message, Client, MessageAttachment} = require('discord.js')
const db = require('../../models/ticket')
const fs = require('fs')
const Guild = require('../../models/Guild')

module.exports = {
    name : 'close',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        let guild = await Guild.findOne({
            guildID: message.guild.id
        })

        let category = guild.ticketCategory;
        let ticketlog = guild.transcriptTicket;

        if(message.channel.parentID !== category) return message.channel.send('You can only use this command in a ticket!');
        const transcriptChannel = message.guild.channels.cache.get(ticketlog)
        message.channel.send('Deleting ticket in 5 seconds.....')
        setTimeout(() => {
            message.channel.delete().then(async ch=> {
                db.findOne({ Channel : ch.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        fs.writeFileSync(`../${ch.id}.txt`, data.Content.join("\n\n"))
                        transcriptChannel.send(`${message.guild.members.cache.get(ch.name).user.username}'s ticket have been closed.`)
                        await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)));
                        db.findOneAndDelete({ Channel : ch.id })
                    }
                })
            })
        }, 5000)
    }
}