const { MessageEmbed, TeamMember } = require('discord.js');
const client = require('../index');
const User = require('../models/User');
const Guild = require('../models/Guild');

const cooldown = new Set();

function addToCooldown(ID) {
    cooldown.add(ID);
    setTimeout(() => {
        cooldown.delete(ID);
    }, 30000 /* 30 seconds */);
}

client.on('message', async(message) => {
        if (message.channel.parentID !== '781212267236163596') return;
        if(!cooldown.has(message.author.id)) {
            addToCooldown(message.author.id);
            let user = await User.findOne({
                guildID: message.guild.id,
                userID: message.author.id,
            });
        
            let guild = await Guild.findOne({ 
                guildID: message.guild.id,
            });
        
                        
            const moneylog = client.channels.cache.get(guild.moneyincomelogChannel);
            const levelup = client.channels.cache.get(guild.levelUpChannel);
            const moneymin = guild.money.min
            const moneymax = guild.money.max
        
            // DUIT + EXP
            let rand = Math.floor(Math.random() * moneymin) + moneymax;
            let randexp = Math.floor(Math.random() * 10) + 10;
        
            user.money += rand;
            user.xp += randexp;
            user.messages++;

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
            .setColor(process.env.COLOR)
            .setDescription(`${message.author.username} recieve chat money + Rp. ${rand}\nGet exp: ${randexp}`)
            moneylog.send({embed : e});
            user.afk = false;
            user.save();
        }
});