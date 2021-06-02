const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const kosuke = require("./handlers/ClientBuilder.js");
const fs = require('fs')
const client = new kosuke({ disableMentions: 'everyone', fetchAllMembers: true, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

require('discord-buttons')(client);
require('dotenv').config();

// mongose env
global.mongosee = require('mongoose');
const { debugPort } = require('process');
mongosee.connect(process.env.MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
    useCreateIndex: true,
	useFindAndModify: false,
});
mongosee.connection.on('connected', () => {
	console.log('[Database] Connected');
});

global.User = require('./models/User');
global.Guild = require('./models/Guild');
global.Thanks = require('./models/thanks');

const blacklist = require('./models/blacklist')
const ticketTranscript = require('./models/ticket')

const prefix = (process.env.PREFIX);
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
})

client.on('message', async message =>{
	const { author } = message;
    if (message.author.bot) return;
	if (!message.guild) return;
	let user = await User.findOne({
		guildID: message.guild.id,
		userID: message.author.id,
	});
	let guild = await Guild.findOne({ guildID: message.guild.id });
	let thank = await Thanks.findOne({
		guildId: message.guild.id,
		userId: message.author.id,
	});
	if (!guild) {
		const newGuild = new Guild({ guildID: message.guild.id });
		newGuild.save();
		return;
	}
	if (!user) {
		const account = {
			username: author.username,
			userId: message.author.id,
		};
		User.create({
			account,
			guildID: message.guild.id,
			userID: message.author.id,
		});
	if (!thank) {
		const newThank = new Thanks({
			guildId: message.guild.id,
			userId: message.author.id,
		});
		newThank.save();
	}
		return;
	}

	if (!message.content.toLowerCase().startsWith(guild.prefix)) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);
	const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
	const com = args.shift().toLowerCase();
	if (com.length == 0) return;
	const command =
		client.commands.get(com) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(com));
	if (command) {
		if (command.timeout) {
			if (Timeout.has(`${message.author.id}${command.name}`)) {
				let um = new MessageEmbed();
				um.setTitle('Hold Up ✋!');
				um.setDescription(
					`You have to wait more ${ms(
						command.timeout,
					)}, to use this command again`,
				);
				um.addField(
					'Why?',
					'Because this system was installed, in order not to flood the chat with bot commands everywhere',
					true,
				);
				um.setFooter(`This message gets deleted after 10s`);
				um.setTimestamp(new Date());
				um.setColor(0xf94343);
				return message
					.reply(um)
					.then((message) => message.delete({ timeout: 10000 }));
			} else {
				Timeout.add(`${message.author.id}${command.name}`);
				setTimeout(() => {
					Timeout.delete(`${message.author.id}${command.name}`);
				}, command.timeout);
			}
		}
		command.run(client, message, args);
	}
	client.nodb = (user) =>
		message.channel.send(
			new MessageEmbed()
				.setColor('RED')
				.setDescription(`${user.tag} Is Not On The Database`),
		);
});

client.on('message', async(message) => {
    if(message.channel.parentID !== '829582353872977940') return;
    ticketTranscript.findOne({ Channel : message.channel.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
           console.log('there is data')
           data.Content.push(`${message.author.tag} : ${message.content}`) 
        } else {
            console.log('there is no data')
            data = new ticketTranscript({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
        }
        await data.save()
            .catch(err =>  console.log(err))
        console.log('data is saved ')
    })

})

client.on('guildCreate', (guild) => {
	require("./events/guildCreate")(guild);
});

client.on("guildMemberAdd", async(member) => {
	require("./events/guildAddMember")(member);
});

client.on("guildMemberRemove", async(member) => {
	require('./events/guildMemberRemove')(member);
});

client.on("message" ,async(message) =>{
	require("./events/guildaddMoney");
})

client.login(process.env.TOKEN)

module.exports = client;
