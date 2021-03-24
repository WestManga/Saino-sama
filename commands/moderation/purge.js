const Discord = require("discord.js")

module.exports = {
  name:'purge',
  description:'Menghapus pesan dalam jumlah banyak dalam 1 waktu',
  usage:'purge <jumlah pesan>',
  cooldown:10,
  run: async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("aku takbisa menghapus pesan yang kauinginkan. Maaf, ya ...")
    if (!args[0]) return message.channel.send(" Tidak bisa menghapus pesan yang kau inginkan!")
    if (isNaN(args[0])) return message.channel.send('Kamu hanya dapat menginput angka')
    message.channel.bulkDelete(args[0])
      message.channel.send(`:ok_hand: ${args[0]} Pesan telah terhapus!`).then(message => message.delete({ timeout: 5000 }))
    }
}