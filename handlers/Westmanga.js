const Discord = require('discord.js');
let axios = require('axios');
const { MessageButton } = require('discord-buttons');

class Westmanga {
    constructor(client) {
        this.client = client;
    }

    getSearch(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
                let get = await axios.get(`https://westapi.herokuapp.com/api/search/${query}`);
                let data_search = get.data.manga_list;
                if (data_search.length < 1) return message.reply(`Pencarian dengan keyword **${query}** tidak ditemukan!`);

                //get endpoint
                let endpoint_search = [];
                data_search.forEach(a => {
                    endpoint_search.push(a.endpoint);
                });
                console.log(endpoint_search)

                //send title results
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle('Hasil Pencarian')
                    .setDescription(data_search.map((a, i) => `${i + 1}. ${a.title}`).join('\n'))
                let embed_search = await message.channel.send(embed);
                let alert_search = await message.reply('pilih untuk melanjutkan!');

                let author = message.author;
                let response = await message.channel.awaitMessages((m) => m.content.toLowerCase() && m.author.id === author.id, {
                    max: 1,
                    time: 100000,
                    errors: ["time"]
                }).catch((err) => {
                    return message.reply('waktu permintaan telah habis!\nSilahkan buat Permintaan kembali!').then(t => {
                        t.delete({ timeout: 5000 });
                        embed_search.delete();
                        alert_search.delete();
                    });
                });

                const search_index = response.first().content;
                let result_search = endpoint_search[search_index - 1];
                await embed_search.delete();
                await alert_search.delete();
                await this.getDetail(result_search, message).then(t => {
                    response.first().delete();
                });

                fullfill();
            } catch (error) {
                reject(error);
            }
        })
    }

    getDetail(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
                let get = await axios.get(`https://westapi.herokuapp.com/api/manga/detail/${query}`);
                const linkbaca = get.data.manga_endpoint;

                //button
                let tombol = new MessageButton()
                    .setStyle('url')
                    .setLabel(`Lihat ${get.data.type}`)
                    .setURL(`${linkbaca}`)
                    .setEmoji("✔️")

                //embed
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle(this.client.util.truncate(get.data.title))
                    .setURL(get.data.manga_endpoint)
                    .setDescription(this.client.util.truncate(get.data.synopsis))
                    .setThumbnail(get.data.thumb)
                    .addField('📁 Type', `${get.data.type || `Unknown`}`, true)
                    .addField('⏳ Status', `${get.data.status || `Unknown`}`, true)
                    .addField('👤 Author', `${get.data.author || `Unknown`}`, true)
                    .addField('📆 Last Update', `${get.data.last_update || `Unknown`}`, true)
                    .addField('📖 Last Chapter', `${get.data.last_chapter || `Unknown`}`, true)
                    .addField('⭐ Rating', `${get.data.rating || `Unknown`}`, true)
                    .setFooter(`Kosuke © 2021, Westmanga`)
                await message.channel.send({
                    embed: embed,
                    component: tombol
                })
                
                fullfill();
            } catch (error) {
                reject(error);
            }
        })
    }
}


module.exports = Westmanga;
