const Discord = require("discord.js");
const User = require("../../models/User");
const Guild = require("../../models/Guild");
const db = require("../../models/convert");

module.exports = {
  name: "convert",
  category: "account",
  description: "Convert money to another wallet",
  usage: "<tujuan> <nomer tujuan> <nominal>",
  cooldown: 1000,
  run: async (client, message, args) => {
    let owner = message.guild.members.cache.get(process.env.OWNER);
    let member = message.guild.member();
    let user = message.author;
    let author = message.guild.members.cache.get(message.author.id);
    let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
    let guildname = message.member.guild.name;
    let guildavatar = message.guild.iconURL({ size: 4096, dynamic: true });
    let now = new Date();

    let tujuan = args[0];
    if (!tujuan) {
      return message.channel.send(
        "Kamu wajib mengisi tujuan kamu!\nKamu dapat memilih tujuan berupa `pulsa` atau `gopay/ovo`"
      );
    }

    let nomortujuan = args[1];
    if (!nomortujuan) {
      return message.channel
        .send("Kamu wajib mengisi nomer tujuan kamu!")
        .then((m) => m.delete({ timeout: 10000 }));
    }
    if (isNaN(nomortujuan)) {
      return message.channel
        .send("Kamu wajib mengisi nomer dengan angka!")
        .then((m) => m.delete({ timeout: 10000 }));
    }
    let nomorlength = args[1].length;
    if (nomorlength < 11) {
      return message.channel
        .send("Kamu yakin? Nomermu dibawah 11 digit lho!")
        .then((m) => m.delete({ timeout: 10000 }));
    }
    if (nomorlength > 13) {
      return message.channel
        .send("Kamu yakin? Nomermu lebih dari 13 digit lho!")
        .then((m) => m.delete({ timeout: 10000 }));
    }

    let nominal = args[2];
    if (nominal < 10000) {
      return message.channel.send("Minimum adalah 10000 lho!");
    }
    if (isNaN(nominal))
      return message.channel
        .send("Kamu harus memasukan nominal dalam angka!")
        .then((m) => m.delete({ timeout: 10000 }));

    let datauser = await User.findOne({
      guildID: message.guild.id,
      userID: message.author.id,
    });
    if (!datauser) client.nodb(member.user);

    let dataguild = await Guild.findOne({
      guildID: message.guild.id,
    });
    let convertch = client.channels.cache.get(dataguild.convertChannel);
    if (!convertch) {
      return message.channel
        .send(
          `Channel convert not found! please set first with ${dataguild.prefix}setch convertch`
        )
        .then((m) => m.delete({ timeout: 10000 }));
    }

    if (dataguild.active.convert === false) {
      message.delete();
      return message.channel
        .send("Saat ini list convert sudah penuh, tunggu slot kosong ya!")
        .then((m) => m.delete({ timeout: 10000 }));
    }

    try {
      if (tujuan.toLowerCase() === "pulsa") {
        let nominal = args[2];
        if (nominal < "15000")
          return message.channel
            .send("Kamu harus memasukan nominal minimum 15.000")
            .then((m) => m.delete({ timeout: 10000 }));
        let saldoku = datauser.money;
        if (saldoku < nominal)
          return message.channel
            .send(`Saldo kamu kurang men!\nSaldo kamu hanya Rp.${saldoku}`)
            .then((m) => m.delete({ timeout: 10000 }));
        let tanggal = new Date();

        let embednotif = new Discord.MessageEmbed()
          .setAuthor(message.author.username, avatar)
          .setColor("RED")
          .addField("Username", user.username)
          .addField("Tujuan", tujuan, true)
          .addField("Nomor Tujuan", nomortujuan, true)
          .addField("Nominal", `Rp.${nominal}`, true)
          .addField("Tanggal", tanggal)
          .addField("Status", "On Waiting List")
          .setTimestamp();
        convertch.send({ embed: embednotif });

        author.send(
          new Discord.MessageEmbed()
            .setAuthor(guildname, guildavatar)
            .setColor("RED")
            .setDescription(
              "Terimakasih telah melakukan penukaran!\nPermintaan kamu telah diterima dan akan diteruskan.\nHarap tunggu paling lambat 2x24 jam setelah message ini dibuat!"
            )
            .addField("Username", user.username)
            .addField("Tujuan", tujuan, true)
            .addField("Nomor Tujuan", nomortujuan, true)
            .addField("Nominal", `Rp.${nominal}`, true)
            .addField("Tanggal", tanggal)
            .addField("Status", "On Waiting List")
        );
        datauser.money -= nominal;
        datauser.save();
        message.delete();
        message
          .reply(
            `Pertukaran berhasil, harap baca DM..\nSaldo kamu saat ini tersisa Rp.${datauser.money}`
          )
          .then((m) => m.delete({ timeout: 10000 }));
      } else if (tujuan.toLowerCase() === "gopay" || "ovo") {
        let nominal = args[2];
        if (nominal < "15000")
          return message.channel
            .send("Kamu harus memasukan nominal minimum 15.000")
            .then((m) => m.delete({ timeout: 10000 }));
        let saldoku = datauser.money;
        if (saldoku < nominal)
          return message.channel
            .send(`Saldo kamu kurang men!\nSaldo kamu hanya Rp.${saldoku}`)
            .then((m) => m.delete({ timeout: 10000 }));
        let tanggal = new Date();

        let embednotif = new Discord.MessageEmbed()
          .setAuthor(message.author.username, avatar)
          .setColor("RED")
          .addField("Username", user.username)
          .addField("Tujuan", tujuan, true)
          .addField("Nomor Tujuan", nomortujuan, true)
          .addField("Nominal", `Rp.${nominal}`, true)
          .addField("Tanggal", tanggal)
          .addField("Status", "On Waiting List")
          .setTimestamp();
        convertch.send({ embed: embednotif });

        author.send(
          new Discord.MessageEmbed()
            .setAuthor(guildname, guildavatar)
            .setColor("RED")
            .setDescription(
              "Terimakasih telah melakukan penukaran!\nPermintaan kamu telah diterima dan akan diteruskan.\nHarap tunggu paling lambat 2x24 jam setelah message ini dibuat!"
            )
            .addField("Username", user.username)
            .addField("Tujuan", tujuan, true)
            .addField("Nomor Tujuan", nomortujuan, true)
            .addField("Nominal", `Rp.${nominal}`, true)
            .addField("Tanggal", tanggal)
            .addField("Status", "On Waiting List")
        );
        datauser.money -= nominal;
        datauser.save();
        message.delete();
        message
          .reply(
            `Pertukaran berhasil, harap baca DM..\nSaldo kamu saat ini tersisa Rp.${datauser.money}`
          )
          .then((m) => m.delete({ timeout: 10000 }));
      }

      owner.send(new Discord.MessageEmbed()
        .setAuthor(guildname, guildavatar)
        .setColor(process.env.COLOR)
        .setDescription("Request convert baru!!")
        .addField("Username", user.username)
        .addField("Tujuan", tujuan, true)
        .addField("Nomor Tujuan", nomortujuan, true)
        .addField("Nominal", `Rp.${nominal}`, true)
        .addField("Tanggal", now)
        .addField("Status", "On Waiting List")
      )

      db.findOne(
        { guildID: message.guild.id, userID: message.author.id },
        async (err, data) => {
          if (err) throw err;
          if (!data) {
            data = new db({
              guildID: message.guild.id,
              userID: message.author.id,
              convertdata: [
                {
                  tujuan: tujuan,
                  nomor: nomortujuan,
                  nominal: nominal,
                  tanggalReq: new Date(),
                  Status: "Pending",
                },
              ],
            });
          } else {
            const obj = {
              tujuan: tujuan,
              nomor: nomortujuan,
              nominal: nominal,
              tanggalReq: new Date(),
              Status: "Pending",
            };
            data.convertdata.push(obj);
          }
          data.save();
        }
      );
    } catch (err) {
      console.log(err);
      return message.channel.send(`Upss.. error found!\n${err.message}`);
    }
  },
};