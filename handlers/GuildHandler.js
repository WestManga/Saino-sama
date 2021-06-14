const dbguild = require('../models/Guild');

class GuildHandler {
    constructor(client) {
        this.client = client;
    }

    async prefix(message) {
        return new Promise(async (resolve, reject) => {
            try {
                dbguild.findOne({ guildID: message }, async (err, data) => {
                    if (err) throw err;
                    if (!data) {
                        console.log('Error: Guild not have data!');
                    }
                    if (data) {
                        let prefix = data.prefix;
                        resolve(prefix);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = GuildHandler;