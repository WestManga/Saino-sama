const Discord = require('discord.js');
let axios = require('axios');
const { MessageButton } = require('discord-buttons');

class MalManga {
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
                let get = await axios.get(`https://api.jikan.moe/v3/search/manga?q=${query}&page=1&limit=20`);
                let data_search = get.data.results;
                if (data_search < 1) return message.reply(`Pencarian dengan keyword **${query}** tidak ditemukan!`);

                //get endpoint
                let endpoint_search = [];
                data_search.forEach(a => {
                    endpoint_search.push(a.mal_id);
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
                let get = await axios.get(`https://api.jikan.moe/v3/manga/${query}`);
                const linkmal = get.data.url;
                const mangatype = get.data.type;

                //button
                let tombol = new MessageButton()
                    .setStyle('url')
                    .setLabel(`Lihat ${mangatype}`)
                    .setURL(`${linkmal}`)
                    .setEmoji("✔️")

                let genre_search = get.data.genres;
                let listgenre = [];
                genre_search.forEach(a => {
                    listgenre.push(a.name)
                })
                if (listgenre.length < 0) return undefined

                //embed
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle(this.client.util.truncate(get.data.title))
                    .setURL(linkmal)
                    .setDescription(this.client.util.truncate(get.data.synopsis ?? `Sinopsis tidak tersedia`))
                    .setThumbnail(get.data.image_url)
                    .addField('📁 Type', `${get.data.type ?? `??`}`, true)
                    .addField('⏳ Status', `${get.data.status ?? `??`}`, true)
                    .addField('⭐ Score', `${get.data.score || `??`}`, true)
                    .addField('📆 Published', `${get.data.published.string || `??`}`)
                    .addField('📔 Volume', `${get.data.volumes ?? `??`}`, true)
                    .addField('📄 Chapter', `${get.data.chapters ?? `??`}`, true)
                    .addField('🏆 Ranking', `#${get.data.rank ?? `??`}`, true)
                    .addField('📂 Genre', listgenre.join(', '))
                    .setTimestamp()
                    .setFooter(`Source from MyAnimeList`)
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


module.exports = MalManga;