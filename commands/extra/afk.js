const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
  name:'afk',
  category:'extra',
  description:'Set AFK',
  usage:'<reason>',
  cooldown:1000,
  run: async(client, message, args) => {
    try {
        const status = new db.table('AFKs');
        let afk = await status.fetch(message.author.id);

        //ignore AFK
        let reason = args.join(' ').toString();

        if (!afk) {
            message.delete()
            message.channel.send(`**${message.author.tag}** telah AFK! \n**Alasan:** ${reason ? reason : "AFK"}`, { disableMentions: 'all' }).then(d => d.delete({ timeout: 10000 }));
            setTimeout(() => {
                status.set(message.author.id, { alasan: reason || 'AFK' });
                status.add(`${message.author.id}.time`, Date.now());
            }, 7000);

        } else {
            status.delete(message.author.id);
        };

    } catch (error) {
        return message.channel.send(`Something went wrong: ${error.message}`);
        // Restart the bot as usual.
    };
  }
};