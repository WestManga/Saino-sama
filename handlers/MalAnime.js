const Discord = require('discord.js');
let axios = require('axios');
const { MessageButton } = require('discord-buttons');
const animegenre = require('../config/anime-genre.json');

class MalAnime {
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
                let get = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${query}&page=1&limit=20`);
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
                let get = await axios.get(`https://api.jikan.moe/v3/anime/${query}`);
                const linkanime = get.data.url;

                //button
                let tombol = new MessageButton()
                    .setStyle('url')
                    .setLabel(`Lihat Anime`)
                    .setURL(`${linkanime}`)

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
                    .setURL(linkanime)
                    .setDescription(this.client.util.truncate(get.data.synopsis ?? `Sinopsis tidak tersedia`))
                    .setThumbnail(get.data.image_url)
                    .addField('📁 Type', `${get.data.type ?? `??`}`, true)
                    .addField('⏳ Status', `${get.data.status ?? `??`}`, true)
                    .addField('📝 Source', `${get.data.source || `??`}`, true)
                    .addField('📆 Premiered', `${get.data.premiered ?? `??`}`, true)
                    .addField('💿 Episodes', `${get.data.episodes || `??`}`, true)
                    .addField('⭐ Score', `${get.data.score || `??`}`, true)
                    .addField('📺 Aired', `${get.data.aired.string || `??`}`)
                    .addField('⚠️ Rating', `${get.data.rating ?? `Unknown`}`, true)
                    .addField('🕜 Duration', `${get.data.duration || `? min`}`, true)
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

    // SEARCH ANIME GENRE LIST //
    getSearchAnimeGenreList(message) {
        return new Promise(async (fullfill, reject) => {
            try {
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;

                let genre_list = animegenre;
                let listGenre = [];
                genre_list.forEach((a, i) => {
                    listGenre.push({ genre: `${i + 1}. ${a.name}`, endpoint: a.number})
                });

                //get endpoint
                let endpoint_search = [];
                genre_list.forEach(a => {
                    endpoint_search.push(a.number);
                });
                console.log(endpoint_search)

                let page = 1;
                let genreChunk = this.client.util.chunk(listGenre, 10);
                console.log(genreChunk[0])
                //send title results
                let embedcari = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle(`Berikut adalah List Genre yang tersedia`)
                    .setDescription(genreChunk[page - 1].map(a => a.genre))
                let embed_search = await message.channel.send(embedcari);
                let embed_reply = await message.reply('Silahkan gunakan nomer diatas sebagai pencarian genre\nContoh : `!search anime 10,11,23,1`');

                await embed_search.react('👈')
                await embed_search.react('♻')
                await embed_search.react('👉')

                const backwardsFilter = (reaction, user) =>
                    reaction.emoji.name === `👈` && user.id === message.author.id;
                const deleteFilter = (reaction, user) =>
                    reaction.emoji.name === `♻` && user.id === message.author.id;
                const forwardsFilter = (reaction, user) =>
                    reaction.emoji.name === `👉` && user.id === message.author.id;

                const backwards = embed_search.createReactionCollector(backwardsFilter);
                const deletes = embed_search.createReactionCollector(deleteFilter);
                const forwards = embed_search.createReactionCollector(forwardsFilter);

                backwards.on("collect", (f) => {
                    if (page === 1) return;
                    page--;
                    embedcari.setDescription(genreChunk[page - 1].map(a => a.genre));
                    embedcari.setFooter(`Page ${page} of ${genreChunk.length}`)
                    embed_search.edit(embedcari);
                })
                deletes.on("collect", (f) => {
                    embed_search.delete();
                    embed_reply.delete();
                })
                forwards.on("collect", (f) => {
                    if (page == genreChunk.length) return;
                    page++;
                    embedcari.setDescription(genreChunk[page - 1].map(a => a.genre));
                    embedcari.setFooter(`Page ${page} of ${genreChunk.length}`)
                    embed_search.edit(embedcari);
                });

                embed_search.delete({ timeout: 60000 });
                embed_reply.delete({ timeout: 60000 });

                fullfill();
            } catch (error) {
                reject(error);
                return;
            }
        })
    }
    
    // SEARCH ANIME BY GENRE //
    getSearchAnimeGenre(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
                let get = await axios.get(`https://api.jikan.moe/v3/search/anime?q=&page=1&genre=${query}&order_by=score`);
                let data_search = get.data.results;
                if (data_search < 1) return message.reply(`Pencarian dengan keyword **${query}** tidak ditemukan!`);

                let listJudul = [];
                data_search.forEach((a, i) => {
                    listJudul.push({ title: `${i + 1}. ${a.title}`, endpoin: a.mal_id});
                });

                //get endpoint
                let endpoint_search = [];
                data_search.forEach(a => {
                    endpoint_search.push(a.mal_id);
                });
                console.log(endpoint_search)

                let page = 1;
                let judulChunk = this.client.util.chunk(listJudul, 15);
                console.log(judulChunk[0])
                //send title results
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle(`Hasil Pencarian Anime`)
                    .setDescription(judulChunk[page - 1].map(a => a.title))
                let embed_search = await message.channel.send(embed);
                let alert_search = await message.reply('pilih untuk melanjutkan!');

                await embed_search.react('👈')
                await embed_search.react('👉')

                const backwardsFilter = (reaction, user) =>
                    reaction.emoji.name === `👈` && user.id === message.author.id;
                const forwardsFilter = (reaction, user) =>
                    reaction.emoji.name === `👉` && user.id === message.author.id;

                const backwards = embed_search.createReactionCollector(backwardsFilter);
                const forwards = embed_search.createReactionCollector(forwardsFilter);

                backwards.on("collect", (f) => {
                    if (page === 1) return;
                    page--;
                    embed.setDescription(judulChunk[page - 1].map(a => a.title));
                    embed.setFooter(`Page ${page} of ${judulChunk.length}`)
                    embed_search.edit(embed);
                })
                forwards.on("collect", (f) => {
                    if (page == judulChunk.length) return;
                    page++;
                    embed.setDescription(judulChunk[page - 1].map(a => a.title));
                    embed.setFooter(`Page ${page} of ${judulChunk.length}`)
                    embed_search.edit(embed);
                });

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
                await this.getDetailAnimeGenre(result_search, message).then(t => {
                    response.first().delete();
                });

                fullfill();
            } catch (error) {
                reject(error);
            }
        })
    }

    // GET DETAIL MANGA //
    getDetailAnimeGenre(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
                let get = await axios.get(`https://api.jikan.moe/v3/manga/${query}`);
                const linkmal = get.data.url;

                //button
                let tombol = new MessageButton()
                    .setStyle('url')
                    .setLabel(`Lihat Anime`)
                    .setURL(`${linkmal}`)

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
                    .addField('📝 Source', `${get.data.source || `??`}`, true)
                    .addField('📆 Premiered', `${get.data.premiered ?? `??`}`, true)
                    .addField('💿 Episodes', `${get.data.episodes || `??`}`, true)
                    .addField('⭐ Score', `${get.data.score || `??`}`, true)
                    .addField('📺 Aired', `${get.data.aired.string || `??`}`)
                    .addField('⚠️ Rating', `${get.data.rating ?? `Unknown`}`, true)
                    .addField('🕜 Duration', `${get.data.duration || `? min`}`, true)
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


module.exports = MalAnime;