const { Client } = require("discord.js");
const Util = require("./util");
const Samehadaku = require('./Samehadaku.js');
const Kusonime = require('./Kusonime.js');
const Westmanga = require('./Westmanga.js');

module.exports = class kosuke extends Client {

    constructor(opt) {
        super(opt);
        this.emoji = require('../config/emoji.json');
        this.warna = require('../config/colors.json');
        this.util = new Util();
        this.samehadaku = new Samehadaku(this);
        this.kusonime = new Kusonime(this);
        this.westmanga = new Westmanga(this);

    }
};