const Discord = require('discord.js');
let axios = require('axios');

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
                await this.getDetail(result_search, message);

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
                let dataChapter = get.data.list_episode;
                let linkbaca = get.data.manga_endpoint;
                let judulmanga = get.data.title;

                //embed
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle(get.data.title)
                    .setURL(get.data.manga_endpoint)
                    .setDescription(this.client.util.truncate(get.data.synopsis))
                    .setThumbnail(get.data.thumb)
                    .addField('Type', get.data.type, true)
                    .addField('Status', get.data.status, true)
                    .addField('Author', get.data.author, true)
                    .addField('Last Update', get.data.last_update, true)
                    .addField('Last Chapter', get.data.last_chapter, true)
                    .addField('Rating', get.data.rating, true)
                    .addField('Baca Manga', `Baca ${judulmanga} dengan [Click Disini](${linkbaca})`)
                    .setFooter(`Kosuke © 2021, Westmanga`)
                let embed_detail = await message.channel.send(embed);

                fullfill();
            } catch (error) {
                reject(error);
            }
        })
    }
}


module.exports = Westmanga;
