module.exports = async(member) => {
    let data =  await Guild.findOne({
        guildID: member.guild.id
    });
    let channel = member.guild.channels.cache.find(ch => ch.name == data.welcomeChannel);
    if(channel) return;
    
    channel.send(`Welcome, ${member}!!!`);
}