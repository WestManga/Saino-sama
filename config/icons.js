const icons = {
	// Resources
	"gold": { name:":moneybag:", icon:"๐ฐ" },

	"oak wood":{ name: ":evergreen_tree:", icon: "๐ฒ" },
	"yew wood":{ name: ":deciduous_tree:", icon: "๐ณ" },
	"barlind wood":{ name: ":tanabata_tree:", icon: "๐" },
	"aspen wood":{ name: ":mountain_snow:", icon: "" },

	"copper ore":{ name: ":orange_circle:", icon: "๐ " },
	"iron ore":{ name: ":white_circle:", icon: "โช๏ธ" },
	"mithril ore":{ name: ":blue_circle:", icon: "๐ต" },
	"burite ore":{ name: ":purple_circle:", icon: "๐ฃ" },
	"obsidian ore":{ name: ":black_circle:", icon: "โซ๏ธ" },

	"bronze bar":{ name: ":orange_square:", icon: "๐ง" },
	"iron bar":{ name: ":white_large_square:", icon: "โฌ๏ธ" },
	"steel bar":{ name: ":brown_square:", icon: "๐ซ" },
	"mithril bar":{ name: ":blue_square:", icon: "" },
	"pyrite bar":{ name: ":purple_square:", icon: "" },

	// Universe
	"Grassy Plains" :{ name: ":deciduous_tree:", icon: "๐ณ" },
	"Misty Mountains" :{ name: ":mountain_snow:", icon: "๐" },
	"Deep Caves" :{ name: ":volcano:", icon: "๐" },

	// actions
	"raid":{ name: ":man_supervillain:", icon: "๐ฆนโโ๏ธ" },
	"hunt":{ name: ":frog:", icon: "๐ธ" },
	"miniboss":{ name: ":zombie:", icon: "๐ง" },
	"fish":{ name: ":blowfish:", icon: "๐ก" },
	"dungeon":{ name: ":map:", icon: "๐บ" },

	// dungeon keys
	"CM Key":{ name: ":key2:", icon: "๐" },
	"The One Shell":{ name: ":shell:", icon: "๐" },
	"Eridian Vase":{ name: ":amphora:", icon: "๐บ" },

	// Military units
	"archery":{ name: ":archery:", icon: "๐น" },
	"barracks":{ name: ":crossed_swords:", icon: "โ๏ธ" },

	// Equipment Types
	"weapon":{ name: ":probing_cane:", icon: "๐ฆฏ" },
	"helmet":{ name: ":helmet_with_cross:", icon: "โ" },
	"chest":{ name: ":womans_clothes:", icon: "๐" },
	"legging":{ name: ":jeans:", icon: "๐" },

	// Shop
	"Small Healing Potion": { name: ":thermometer:", icon:"๐ก" },
	"Large Healing Potion": { name: ":syringe:", icon:"๐" },
	"Enourmous Healing Potion": { name: ":scarf:", icon:"๐งฃ" },
	"Quality Healing Potion": { name: ":pill:", icon:"๐" },
	"Mega Healing Potion": { name: ":school_satchel:", icon:"๐" },
	"Ultra Healing Potion": { name: ":drop_of_blood:", icon:"๐ฉธ" },
	"Small Healing Salve": { name: ":rose:", icon:"๐น" },
	"Large Healing Salve": { name: ":maple_leaf:", icon:"๐" },
	"Quality Healing Salve": { name: ":bowl_with_spoon:", icon:"๐ฅฃ" },


	// Stats
	"xp":{ name: ":mortar_board:", icon: "๐" },
	"health":{ name: ":heart:", icon: "โค๏ธ" },
	"attack":{ name: ":crossed_swords:", icon: "โ๏ธ" },
	"defense":{ name: ":shield:", icon: "๐ก" },

	// Hero
	"armor":{ name: ":martial_arts_uniform:", icon: "๐ฅ" },
	"inventory":{ name: ":school_satchel:", icon: "๐" },

	// weapons
	"strike":{ name: ":knife:", icon: "๐ช" },
	"critical":{ name: ":bangbang:", icon: "โผ๏ธ" },
	"slash":{ name: ":dagger:", icon: "๐ก" },
	"disarm":{ name: ":dove:", icon: "๐" },
	"heal":{ name: ":test_tube:", icon: "๐งช" },
	"poke":{ name: ":point_right:", icon: "๐" },

	// Tower
	"tower header": { name: ":japanese_ogre:", icon: "๐น" },
	"tower drop": { name: "", icon:"" },
	"tower won": { name: ":medal:", icon:"๐" },
	"tower lost": { name: ":anger:", icon: "๐ " },
	"tower fight": { name: ":crossed_swords:", icon: "โ๏ธ" },

	// Supporter
	"bronzeSupporter":{ name:":reminder_ribbon:", icon:"๐" },
	"silverSupporter":{ name:":military_medal:", icon:"๐" },
	"goldSupporter":{ name:":crown:", icon:"๐" },
	"platinumSupporter":{ name:":gem:", icon:"๐" },

	// Misc
	"false":{ name: ":x:", icon: "โ" },
	"true":{ name: ":white_check_mark:", icon: "โ" },
	"quest": { name: ":boom:", icon:"๐ฅ" },
	"weeklyPrizeStar":{ name:":star2:", icon:"๐" },
	"dailyPrizeStar": { name:":star:", icon: "โญ๏ธ" },
	"Carrot": { name:":carrot:", icon:"๐ฅ" },
	"cooldown": { name: ":clock9:", icon:"๐" },
	"lottery": { name: ":money_with_wings:", icon:"๐ธ" }
};
/**
 * Returns an emoji if configured in icons-object or a danger symbol if missing
 * @param {string} type - eg: "gold", "copper ore" or "true"
 * @param {string} style - enum: "name" (":knife:") or "icon" ("๐ช")
 * NOTE: message.react and icons in footer of embeds needs to be icon and not name.
 **/

const getIcon = (type, style = "name")=> icons[type] ? icons[type][style] : "โ ๏ธ";


module.exports = { getIcon };
