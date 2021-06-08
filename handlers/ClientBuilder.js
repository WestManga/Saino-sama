const { Client } = require("discord.js");
const Util = require("./util");
const HentaiUtil = require('./nhentai/HentaiUtil');
const Samehadaku = require('./Samehadaku.js');
const Kusonime = require('./Kusonime.js');
const Westmanga = require('./Westmanga.js');
const Horoskop = require('./Horoskop');
const MalAnime = require('./MalAnime');
const MalManga = require('./MalManga');
const readerNH = require('./readerNH');
const HentaiEmbed = require('./nhentai/HentaiEmbed');

module.exports = class kosuke extends Client {

    constructor(opt) {
        super(opt);
        this.emoji = require('../config/emoji.json');
        this.warna = require('../config/colors.json');
        this.util = new Util();
        this.hentaiutil = new HentaiUtil();
        this.samehadaku = new Samehadaku(this);
        this.kusonime = new Kusonime(this);
        this.westmanga = new Westmanga(this);
        this.horoskop = new Horoskop(this);
        this.malanime = new MalAnime(this);
        this.malmanga = new MalManga(this);
        this.readernh = new readerNH(this);
        this.hentaiembed = new HentaiEmbed(this);
        this.hentaidl = "https://mangadl.herokuapp.com/download/nhentai"
    }
};