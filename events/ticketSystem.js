const Discord = require('discord.js');
const Guild = require('../models/Guild');
const ticketTranscript = require('../models/ticket');

module.exports = async(message) => {
    try {
        let guild = await Guild.findOne({
            guildID: message.guild.id
        }).catch(err => console.log(err))

        ticketcategory = guild.ticketCategory;
        if(!ticketcategory) return; 
    
        if(message.channel.parentID !== ticketcategory) return;
        ticketTranscript.findOne({ Channel : message.channel.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               console.log('there is data')
               data.Content.push(`${message.author.tag} : ${message.content}`) 
            } else {
                console.log('there is no data')
                data = new ticketTranscript({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
            }
            await data.save()
                .catch(err =>  console.log(err))
            console.log('data is saved ')
        })
    } catch(err) {
        console.log(err.message);
    }
}