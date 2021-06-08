const { MessageEmbed } = require("discord.js");
const {
    COLOR
} = process.env;

module.exports = {
    name: "settingchannel",
    aliases: ["setch"],
    description: "Setting channel",
    usage: "<setting name> <channel>",
    category: "settings",
    run: async(client, message, args) => {
        await message.delete()
        let data = await Guild.findOne({
            guildID: message.guild.id
        });
        if(!args[0]) return message.reply('Please specify a setting name!\nEx:- !setch `music` `story` `chatmoney` `incomelog` `levelup` `modlog` `moneylog` `suggestch` `welcome` `bye`').then(d => d.delete({ timeout : 20000 }))

        if (args[0].toLowerCase() === 'music') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set music channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.musicChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'story') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set story channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.storyChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'chatmoney') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set chatmoney channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.chatmoneyChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'incomelog') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set incomelog channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.moneyincomelogChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'levelup') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set levelup channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.levelUpChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'modlog') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set modlog channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.modlogChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'moneylog') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set moneylog channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.moneylogChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'suggestch') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set suggest channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.suggestionChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'welcome') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set welcome channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.welcomeChannel = channel.id; data.save();
        } else
        if (args[0].toLowerCase() === 'bye') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set bye channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.byeChannel = channel.id; data.save();
        }
        else
        if (args[0].toLowerCase() === 'parentmoney') {
            if (!args[1]) return message.channel.send('Please Enter Valid Number');
		    if (args[1] < 1)
			return message.channel.send('Copy ID Kategori yang ingin kamu jadikan tempat chatmoney\nLalu masukan disini');
		    if (isNaN(args[1])) return message.channel.send('Thats Not A Number -_-');
            let e = new MessageEmbed()
            .setDescription(`Berhasil mengubah kategori penghasil uang dari chat di <#${args[1]}>`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.categorychatMoney = args[1]; data.save();
        }
        else
        if (args[0].toLowerCase() === 'ruangbk') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set ruangbk channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.ruangbk = channel.id; data.save();
        }
        else
        if (args[0].toLowerCase() === 'ticket') {
            if (!args[1]) return message.channel.send('Please Enter Valid Number');
		    if (args[1] < 1)
			return message.channel.send('Copy ID Kategori yang ingin kamu jadikan tempat chatmoney\nLalu masukan disini');
		    if (isNaN(args[1])) return message.channel.send('Thats Not A Number -_-');
            let e = new MessageEmbed()
            .setDescription(`Berhasil mengubah kategori ticket di <#${args[1]}>`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.ticketCategory = args[1]; data.save();
        }
        else
        if (args[0].toLowerCase() === 'ticketlog') {
            let channel =  message.mentions.channels.first();
            if(!channel) return message.channel.send("Please Provide a channel").then(d => d.delete({ timeout : 10000 }));
            let e = new MessageEmbed()
            .setDescription(`Successfully set ticket log channel at ${channel}`)
            .setTimestamp(new Date())
            .setColor(COLOR)
            message.channel.send({embed: e}).then(d => d.delete({ timeout : 10000 }));
            data.transcriptTicket = channel.id; data.save();
        }
    },
};