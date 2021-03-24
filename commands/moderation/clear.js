const Discord = require("discord.js")

module.exports = {
  name:'clear',
  description:'Menghapus banyak pesan sekaligus dengan jumlah maksimal 99 pesan',
  usage:'clear 100',
  aliases:['clear'],
  cooldown:5,
  run: async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("aku takbisa menghapus pesan yang kauinginkan. Maaf, ya ...")
        if (!args[0]) return message.channel.send("Tolong masukan jumlah pesan yang ingin dihapus (1-99)")
        if (isNaN(args[0])) return message.channel.send('Kamu hanya dapat menginput angka')
        if (parseInt(args[0]) > 99) return message.channel.send('Jumlah maksimal pesan yang dapat dihapus adalah 99 pesan')
        // command hapus pesan
            await message.channel.bulkDelete(parseInt(args[0]) + 1)
                .catch(err => console.log(err))
            message.channel.send(`:ok_hand: | ${args[0]} Pesan telah dihapus!`).then(m => m.delete({ timeout : 5000 }))
    }
}