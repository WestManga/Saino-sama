const Discord = require("discord.js")

module.exports = {
  name:'nh-random',
  category:'nhentai',
  description:'nhentai random picker',
  usage:'',
  aliases:[''],
  cooldown:1000,
  run: async(client, msg, args) => {
    if (!msg.channel.nsfw)
    return msg.channel
    .send(`NSFW channel please.`)
    .then(msg => msg.delete({ timeout: 5000 }));
    try {
    let res = await client.hentaiembed.getRandom();
    await client.hentaiembed.getInfoEmbed(res.id, msg);
    } catch(err) {
        console.log(err.msg);
        return;
    }
  }
};