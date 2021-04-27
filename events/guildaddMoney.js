const { MessageEmbed, TeamMember } = require('discord.js');
const client = require('../index');
const User = require('../models/User');
const Guild = require('../models/Guild');
const { determineSupporterTitle } = require('../handlers/profilehelper');

const cooldown = new Set();

function addToCooldown(ID) {
    let cd = Math.floor(Math.random() * (60000 - 30000) + 30000);
    cooldown.add(ID);
    setTimeout(() => {
        cooldown.delete(ID);
    }, cd /* 30 seconds */);
}

client.on('message', async(message) => {
    let guild = await Guild.findOne({ 
        guildID: message.guild.id,
    });

    let user = await User.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
    });

    const patreonSupporter = determineSupporterTitle(user.account.patreon);

        if (message.channel.parentID !== guild.categorychatMoney) return;
        if(!cooldown.has(message.author.id)) {
            addToCooldown(message.author.id);

            const moneylog = client.channels.cache.get(guild.moneyincomelogChannel);
            const levelup = client.channels.cache.get(guild.levelUpChannel);
            const moneymin = guild.money.min
            const moneymax = guild.money.max
        
            // DUIT + EXP
            let rand = Math.floor(Math.random() * (moneymax - moneymin) + moneymin);
            let randexp = Math.floor(Math.random() * 10) + 10;

            // Patreon Bonus
            if (user.account.patreon === "Silver") {
                rand *= 2;
                randexp *= 2;

                user.money += rand;
                user.xp += randexp;
                user.messages++;
            } else
            if (user.account.patreon === "Gold") {
                rand *= 4;
                randexp *= 4;

                user.money += rand;
                user.xp += randexp;
                user.messages++;
            } else 
            if (user.account.patreon === "Platinum") {
                rand *= 4;
                randexp *= 4;

                user.money += rand;
                user.xp += randexp;
                user.messages++;
            } else
            if (user.account.patreon === "Bronze" , "") {
                user.money += rand;
                user.xp += randexp;
                user.messages++;
            }
               

            const level = user.level
            const exp = process.env.UPXP
            const exprequired = Math.round(level * exp)
            
            if (user.xp >= exprequired) {
                let e = new MessageEmbed()
                    .setColor(process.env.COLOR)
                    .setDescription(
                        `:tada: Congrats ${message.author.username} You Level Up\nYou are now level ${user.level}`,
                    );
                levelup.send(e);
                user.xp -= exprequired;
                user.level += 1;
            }
        
            let e = new MessageEmbed()
            .setColor("#99d42c")
            .setTitle('<:update:836111138576007228>︱Balance Update')
            .setDescription(`User: **${message.author.username}**\nRank: ${patreonSupporter}\nReceived:  \`Rp.${rand}\`\nGet EXP: \`${randexp}\``)
            .setTimestamp()
            moneylog.send({embed : e});
            user.afk = false;
            user.save();
        }
});