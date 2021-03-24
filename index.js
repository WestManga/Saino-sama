const {Collection, Client, Discord} = require('discord.js')
const Kosuke = require("./handlers/ClientBuilder.js");
const fs = require('fs')
const client = new Kosuke({ disableMentions: 'everyone', fetchAllMembers: true, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

//mongoose config
const mongoose = require('mongoose');
const { debugPort } = require('process');

mongoose.connect('mongodb://127.0.0.1:27017/kosuke', {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('✅ Connected to MongoDB - Kosuke'))

//schema  -----------------------------------------
 
client.ticketTranscript = mongoose.model('transcripts', 
    new mongoose.Schema({
        Channel : String,
        Content : Array
    })
)
// -------------------------------------------------

const blacklist = require('./models/blacklist')
const prefixSchema = require('./models/prefix')

const config = require('./config.json')
const prefix = config.prefix
const token = config.token
const db = require('quick.db');
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

/**
 * @param {Client} client
 */
    client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
        .catch(err => console.log(err))

        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
})

client.on('message', async message =>{
    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '436447151451668490') return message.channel.send(`Prefix in ${message.guild.name} is ${p}`)
    }
    if(message.author.bot) return;
    if(!message.content.startsWith(p)) return;
    blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            if (!message.guild) return;
            if(!message.guild) return;
            if(!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(p.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if(cmd.length == 0 ) return;
            let command = client.commands.get(cmd)
            if(!command) command = client.commands.get(client.aliases.get(cmd));
            if(command) command.run(client, message, args) 
        } else {
            message.channel.send('You are blacklisted')
        }
    })
})

client.on('message', async(message) => {
    if(message.channel.parentID !== '824261268851916821') return;
    client.ticketTranscript.findOne({ Channel : message.channel.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
           console.log('there is data')
           data.Content.push(`${message.author.tag} : ${message.content}`) 
        } else {
            console.log('there is no data')
            data = new client.ticketTranscript({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
        }
        await data.save()
            .catch(err =>  console.log(err))
        console.log('data is saved ')
    })

})

client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild : guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('Deleted data.'))
        }
    })
})

client.login(token)
