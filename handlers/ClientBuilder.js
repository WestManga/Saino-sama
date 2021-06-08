const { Client } = require("discord.js");
const Util = require("./util");
const HentaiUtil = require('./nhentai/HentaiUtil');
const Samehadaku = require('./Samehadaku.js');
const Kusonime = require('./Kusonime.js');
const Westmanga = require('./Westmanga.js');
const Horoskop = require('./Horoskop');
const MalAnime = require('./MalAnime');
const MalManga = require('./MalManga');
const HentaiEmbed = require('./nhentai/HentaiEmbed');
const HentaiFavorite = require('./nhentai/HentaiFavorite');
const HentaiDB = require('./nhentai/HentaiDB');

module.exports = class kosuke extends Client {

    constructor(opt) {
        super(opt);
        this.emoji = require('../config/emoji.json');
        this.warna = require('../config/colors.json');
        this.version = require('../package.json').version;
        this.util = new Util();
        this.hentaiutil = new HentaiUtil();
        this.samehadaku = new Samehadaku(this);
        this.kusonime = new Kusonime(this);
        this.westmanga = new Westmanga(this);
        this.horoskop = new Horoskop(this);
        this.malanime = new MalAnime(this);
        this.malmanga = new MalManga(this);
        this.hentaiembed = new HentaiEmbed(this);
        this.hentaifavorite = new HentaiFavorite(this);
        this.hdb = new HentaiDB(this);
        this.hentaidl = "https://mangadl.herokuapp.com/download/nhentai";
        this.nHlogo = "https://cdn.discordapp.com/attachments/466964106692395008/580378765419347968/icon_nhentai.png";
    }
};