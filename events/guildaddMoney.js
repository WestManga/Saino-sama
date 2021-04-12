const { MessageEmbed, TeamMember } = require('discord.js');
const client = require('../index');
const User = require('../models/User');
const Guild = require('../models/Guild');

client.on('message', async(message) => {
        if(message.channel.parentID !== '781212267236163596') return;
        let user = await User.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
        });
    
        let guild = await Guild.findOne({ 
            guildID: message.guild.id,
        });
    
        const chatmoneych = client.channels.cache.get(guild.chatmoneyChannel); 
        
        const moneylog = client.channels.cache.get(guild.moneyincomelogChannel);
        const levelup = client.channels.cache.get(guild.levelUpChannel);
    
        // DUIT + EXP
        let rand = Math.floor(Math.random() * 5) + 5;
        let randexp = Math.floor(Math.random() * 4) + 3;
    
        user.money += rand;
        user.xp += randexp;
        user.messages++;
        
        if (user.xp >= process.env.UPXP) {
            let e = new MessageEmbed()
                .setColor(process.env.COLOR)
                .setDescription(
                    `[:tada:] Congrats ${message.author.username} You Level Up`,
                );
            levelup.send(e);
            user.xp -= process.env.UPXP;
            user.level += 1;
        }
    
        let e = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author.username} recieve chat money + Rp. ${rand}\nGet exp: ${randexp}`)
        moneylog.send({embed : e});
        user.afk = false;
        user.save();
});