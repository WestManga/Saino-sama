const thankslb = require('../models/thanks-lb');
const thanksdb = require('../models/thanks');

const fetchTopMember = async (guildId) => {
    let text = ''

    const results = await thanksdb
    .find({
        guildId,
    })
    .sort({
        received: -1,
    })
    .limit(10)

    for (let counter = 0; counter < results.length; ++counter) {
        const { userId, received = 0 } = results[counter]

        text += `#${counter + 1} <@${userId}> has ${received} thanks\n`
    }

    text += `\nThis leaderboard is updated every minutes\nKamu dapat memberikan poin tanda terimakasih kepada seseorang yang telah membantumu dengan command: ${process.env.PREFIX}thanks <user>`
    return text
}

const updateLeaderboard = async (client) => {
    const results = await thankslb.find({})

    for (const result of results) {
        const { channelId, _id: guildId } = result

        const guild = client.guilds.cache.get(guildId);
        if (guild) {
            const channel = guild.channels.cache.get(channelId);
            if (channel) {
                const messages = await channel.messages.fetch()
                const firstMessage = messages.first()

                const topMembers = await fetchTopMember(guildId)

                if (firstMessage) {
                    firstMessage.edit(topMembers)
                } else {
                    channel.send(topMembers)
                }
            }
        }
    }

    setTimeout(() => {
        updateLeaderboard(client)
    }, 1000 * 60)
}

module.exports = async (client) => {
    updateLeaderboard(client)
}