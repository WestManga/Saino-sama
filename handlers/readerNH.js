const Discord = require('discord.js');
const { API } = require('nhentai-api');
const api = new API();

class readerNH {
    constructor(client) {
        this.client = client
    }

    getReadWithID(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {
                api.getBook(query).then(async book => {
                    //image
                    let pagination = 0
                    let array_image = api.getImageURL(book.pages[pagination])
                    let lastpage = book.pages.length - 1;

                    //embed
                    let embed = new Discord.MessageEmbed()
                    .setColor(this.client.warna.kato)
                    .setImage(`${array_image}`)
                    .setFooter(`Page ${pagination} of ${lastpage}`)
                    let r = await message.channel.send(embed)
                    r.react('⬅️');
                    r.react('❌');
                    r.react('➡️');

                    //emoji collector
                    const backwardsFilter = (reaction, user) =>
                        reaction.emoji.name === `⬅️` && user.id === message.author.id;
                    const deleteEmbed = (reaction, user) =>
                        reaction.emoji.name === `❌` && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) =>
                        reaction.emoji.name === `➡️` && user.id === message.author.id;
                    const backwards = r.createReactionCollector(backwardsFilter);
                    const DeleteEmbed = r.createReactionCollector(deleteEmbed);
                    const forwards = r.createReactionCollector(forwardsFilter);

                    backwards.on('collect', (f) => {
                        if (pagination === 0) return;
                        pagination--;
                        let images = api.getImageURL(book.pages[pagination])
                        embed.setImage(`${images}`);
                        embed.setFooter(`Page ${pagination} of ${lastpage}`)
                        r.edit(embed)
    
                    });
    
                    DeleteEmbed.on('collect', (f) => {
                        r.delete()
                    });
    
                    forwards.on("collect", (f) => {
                        if (pagination == lastpage) return;
                            pagination++;
                            let images = api.getImageURL(book.pages[pagination])
                            embed.setImage(`${images}`);
                            embed.setFooter(`Page ${pagination} of ${lastpage}`);
                            r.edit(embed);
                    });

                    forwards.off('collect', (f) => {
                        if (pagination === lastpage) return;
                    });

                    fullfill();

                })
            } catch (err) {
                reject(err)
            }
        })
    }
};
module.exports = readerNH