const Discord = require("discord.js");
const { prettifyUser } = require("../../handlers/clan-index");
const Clan = require("../../models/clan");

module.exports = {
  name: "clan",
  category: "clan",
  description: "View Clan",
  cooldown: 1000,
  run: async(client, message, args, user) => {
    let dbUser;
    let avatar;

    const member = message.mentions.users.first() || 
    message.author ||
    messsage.guild.members.cache.get(args[0]);

    if (member) {
        avatar = member.avatarURL({ format: "png", dynamic: true, size: 1024 });
        try {
            // retrieves the user mentioned in as argument eg: !clan @Ignore
            dbUser = await Clan.findOne({ "member.userID": member.id })
        }
        catch (err) {
            console.error("error: ", err);
            return;
        }
    }
    if (!dbUser) {
        dbUser = user;
        return message.reply('Kamu belum bergabung dengan clan!');
    }
    const prettifiedUser = await prettifyUser(message, dbUser, avatar);
    message.channel.send(prettifiedUser);
    },
};
