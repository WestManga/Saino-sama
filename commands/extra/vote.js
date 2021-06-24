const Discord = require("discord.js");
const { COLOR } = process.env;

module.exports = {
  name: "vote",
  category: "extra",
  description: "Make vote!",
  usage: "",
  aliases: [""],
  cooldown: 1000,
  run: async (client, message, args) => {
    try {
        let member = message.author;
        let avatar = member.avatarURL({ size: 4096, dynamic: true });

      let msg = args;

      let vote = new Discord.MessageEmbed()
        .setAuthor(member.username, avatar)
        .setColor(COLOR)
        .setDescription(`**Petition:**\n${msg}`)
        .setFooter(`Please vote! Click reaction for voting..\nVote ended on 1 minutes`)
      let vote_send = await message.channel.send(vote);

      await vote_send.react("👍");
      await vote_send.react("👎");

      const yes = (reaction) => reaction.emoji.name == "👍";
      const no = (reaction) => reaction.emoji.name == "👎";

      vote_send
        .awaitReactions(yes, { time: 60000 })
        .then((collected) => {
        vote.addField('👍', `${collected.size} Vote`, true)
        vote.setFooter(`Vote Ended!`)
        vote_send.edit(vote);
        })
        .catch(console.error);

        vote_send
        .awaitReactions(no, { time: 60000 })
        .then((collected) => {
        vote.addField('👎', `${collected.size} Vote`, true)
        vote.setFooter(`Vote Ended!`)
        vote_send.edit(vote);
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
      return;
    }
  },
};
