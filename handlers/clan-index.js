const Discord = require("discord.js");

const prettifyUser = async (message, user, avatar) => {

	const clanname = user.clanname;
    const clanlogo = user.info.logo;
	const clanid = user.__v + 1;
    const clanleader = user.leadername;
    const description = user.info.description;

	const fields = [
		{
			name: "Clan Leader",
			value: clanleader,
			inline: true,
		},
	];

	const embedUser = new Discord.MessageEmbed()
		.setTitle(`${clanname} (ID:${clanid})`)
		.setDescription(description)
		.setAuthor(clanname, clanlogo)
		.setColor(user.info.warna)
		.addFields(
			...fields,
		);

	if (avatar) {
		embedUser.setThumbnail(clanlogo);
	}

	return embedUser;
};
module.exports = { prettifyUser };
