const { Client, Message } = require('discord.js')

module.exports = {
    name : 'ticket',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if(ch) return message.channel.send('You already have a ticket open.')
        message.guild.channels.create(`${message.author.id}`, {
            type : 'text',
            parent : '829567821003489320',
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    deny : ('VIEW_CHANNEL')
                },
                {
                    id : message.author.id,
                    allow : ("VIEW_CHANNEL", "ATTACH_FILES", "SEND_MESSAGES", "READ_MESSAGE_HISTORY")
                }
            ]
        }).then(async channel=> {
            message.reply(`click <#${channel.id}> to view your ticket`).then(m => m.delete({ timeout : 5000 }))
            channel.send(`${message.author}, welcome to your ticket!`)
        })
    }
}