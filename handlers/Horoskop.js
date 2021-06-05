const Discord = require('discord.js');
let axios = require('axios');

class Horoskop {
    constructor(client) {
        this.client = client;
    }

    getDetailToday(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {
                const roleColor =
                message.guild.me.displayHexColor === "#000000"
                ? "#ffffff"
                : message.guild.me.displayHexColor;
                let get = await axios.get(`https://hororest-api.herokuapp.com/api/today/${query}`);

                //embed
                let embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setTitle(`${get.data.title} Hari ini`)
                    .setDescription(this.client.util.truncate(get.data.intro))
                    .addField('Keseharian', `${get.data.keseharian || `Unknown`}`)
                    .addField('Cinta', `${get.data.cinta || `Unknown`}`)
                    .addField('Keuangan', `${get.data.keuangan || `Unknown`}`)
                    .addField('Pekerjaan', `${get.data.pekerjaan || `Unknown`}`)
                    .setFooter(`Last Update : ${get.data.last_update}\nData from ramalan-harian.com`)
                    await message.channel.send({ embed: embed })
                
                fullfill();
            } catch (error) {
                reject(error);
            }
        })
    }
}


module.exports = Horoskop;
