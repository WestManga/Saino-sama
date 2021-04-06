const { Message } = require('discord.js');
const Schema = require('../../models/mute');

module.exports=  {
    name : 'unmute', 
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'Budak');

        Schema.findOne(
            {
                Guild: message.guild.id,
            },
            async (err, data) => {
                if (!data) return message.reply("Member was not muted");
                const user = data.Users.findIndex((prop) => prop === Member.id);
                // user -> true => 0, 1, 2, 3
                // user -> false => -1
                if (user == -1) return message.reply("Member is not muted!");
                data.Users.splice(user, 1);
                await Member.roles.remove(role);
                message.channel.send(`${Member.displayName} is now unmuted`);
            }
        );
    },
};