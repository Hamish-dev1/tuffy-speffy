const { Hypixel } = require("hypixel-node")
const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {

    const hypixel = new Hypixel(client.config.hypixelAPIkey)
    let name = args.join(" ")

    if (!name) return {

        embed: {

            type: 'error',
            desc: 'Podano nie poprawny nick'
        }

    }

    hypixel.getPlayer(name, (error, player) => {

        if (error) return console.log(error)

        if (player == null) return {
            embed: {
                type: 'error',
                desc: 'Podany gracz nie istnieje'
            }
        }

        else
            return {

                embed: {

                    type: 'error',
                    title: `${player.getRank()} ${name}`,
                    emoji: ":diamonds:",
                    desc: `Poziom: \`${player.getLevel()},\`
                    Zwierzę: \`${player.currentPet || "brak"}\`,
                    Język: \`${player.userLanguage || "ENGLISH"}\`,
                    Karma: \`${player.karma}\`,
                    Cząsteczki: \`${player.particlePack || "brak"}\`,
                    Gadżet: \`${player.currentGadget || "brak"}\`,
                    Aktywny: \`${player.isOnline() ? "tak" : "nie"}\`.`

                }

            }

    })

}

exports.info = {

    name: 'gracz',
    aliases: ['player', 'hp', 'hypixel'],
    description: 'Pokazuje informacje o graczy z serwera Minecraft',
    category: 'Minecraft',
    usage: "<nick>"

}