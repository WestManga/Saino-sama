const Discord = require("discord.js")
const { COLOR } = process.env;

module.exports = {
  name:'setmoney',
  category:'economy',
  description:'Add or Remove user money',
  usage:'<add / remove> <user>',
  cooldown:1000,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns 
   */
  run: async(client, message, args) => {
    let member = message.guild.member(message.mentions.users.first());
    let author = message.guild.members.cache.get(message.author.id);

    if (message.author.id !== process.env.OWNER) return message.channel.send("This is owner only command.")  
    if (!member) return message.channel.send('Please Mention A User');

    if (!args[1]) return message.reply("Please specify a agrument. Agrument is `add` or `remove`");

    if (!args[2]) return message.channel.send('Please Enter Valid Number');
    if (args[2] < 1)
        return message.channel.send('You Need To Transfer More Than 1');
    if (isNaN(args[2])) return message.channel.send('Thats Not A Number -_-');

    let target = await User.findOne({
        guildID: message.guild.id,
        userID: member.id,
    });

    if (author.userID == member.id)
        return message.channel.send('How Is That Possible');
    if (member.user.bot) return message.channel.send('Its A Bot -_-');

    

    if (args[1].toLowerCase() === "add") {
        let embed = new Discord.MessageEmbed()
        .setColor(COLOR)
        .setDescription(
            `**${message.author.username}**  Gives Money to ${member.user.username} Rp. ${args[2]}`
        )

        target.money += Math.floor(parseInt(args[2]));
        target.save();
        message.channel.send({ embed: embed });
        
        Guild.findOne({ guildID: message.guild.id }, async (err, data) => {
            if(!data) return message.reply('this guild not have any data');
    
        const moneylog = client.channels.cache.get(data.moneylogChannel);
        
        //Notification modlog
        let notifembed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setAuthor(`💰 NEW ADD MONEY`)
        .addField("Admin", `User: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
        .addField("Penerima", `User: ${member.user}\nUserID: ${member.user.id}\nUsername: ${member.user.username}`)
        .addField("Nominal Uang", `\`\`\`Rp. ${args[2]}\`\`\``)
        .setTimestamp()
        moneylog.send({ embed: notifembed });
        })
    } else
    if (args[1].toLowerCase() === "remove") {
        let embed = new Discord.MessageEmbed()
        .setColor(COLOR)
        .setDescription(
            `**${message.author.username}**  Removed Rp. ${args[2]} from ${member.user.username}`
        )

        target.money -= Math.floor(parseInt(args[2]));
        target.save();
        message.channel.send({ embed: embed });

        Guild.findOne({ guildID: message.guild.id }, async (err, data) => {
            if(!data) return message.reply('this guild not have any data');
    
        const moneylog = client.channels.cache.get(data.moneylogChannel);
        
        //Notification modlog
        let notifembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`💰 NEW REMOVE MONEY`)
        .addField("Admin", `User: ${message.author}\nUserID: ${message.author.id}\nUsername: ${message.author.username}`)
        .addField("Target", `User: ${member.user}\nUserID: ${member.user.id}\nUsername: ${member.user.username}`)
        .addField("Nominal Uang", `\`\`\`Rp. ${args[2]}\`\`\``)
        .setTimestamp()
        moneylog.send({ embed: notifembed });
        })
    }
  }
};