const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
  name:'ban-list',
  category:'moderation',
  description:'Melihat daftar orang yang telah dibanned',
  aliases:['listban', 'banlist', 'daftarban'],
  cooldown:10,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async(client, message, args) => {
      if (!message.member.permissions.has("BAN_MEMBERS")) return;

      const fetchBans = message.guild.fetchBan();
      const bannedMember = (await fetchBans)
      .map ((member) => `\`${member.user.tag}\``)
      .join(" ");

    message.channel.send(bannedMember);
  }
};