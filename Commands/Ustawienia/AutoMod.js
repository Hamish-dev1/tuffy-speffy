exports.run = async (client, message, args) => {

    if (!args[0])
        return {

            embed: {

                type: "error",
                desc: `> **Podałeś nieprawidłowe argumenty! Lista dostępnych argumentów:**\n\n\`・\` **włącz**\n\`・\`**wyłącz**`

            }

        }

    const on = [
        "włącz",
        "wlacz",
        "on"
    ]

    const off = [
        "wyłącz",
        "wylacz",
        "off"
    ]

    if (on.includes(args[0])) {

        if (client.db.prepare("SELECT * FROM autoMod WHERE guildID = ?").get(message.guild.id))
            return {

                embed: {

                    type: "error",
                    desc: `> **AutoModeracja jest obecnie włączona na tym serwerze, nic nie uległo zmianie.**`

                }

            }

        client.db.prepare("INSERT INTO autoMod (guildID) VALUES (?)").run(message.guild.id)

        return {

            embed: {

                type: "success",
                title: "AutoMod",
                emoji: ":gear:",
                desc: `> **AutoModeracja została włączona na tym serwerze.**`

            }

        }

    }

    if (off.includes(args[0])) {

        if (!client.db.prepare("SELECT * FROM autoMod WHERE guildID = ?").get(message.guild.id))
            return {

                embed: {

                    type: "error",
                    desc: `> **AutoModeracja jest obecnie wyłączona na tym serwerze, nic nie uległo zmianie.**`

                }

            }

        client.db.prepare("DELETE FROM autoMod WHERE guildID = ?").run(message.guild.id)

        return {

            embed: {

                type: "success",
                title: "AutoMod",
                emoji: ":gear:",
                desc: `> **AutoModeracja została wyłączona na tym serwerze.**`

            }

        }

    }

    return {

        embed: {

            type: "error",
            desc: `> **Podałeś nieprawidłowe argumenty! Lista dostępnych argumentów:**\n\n\`・\` **włącz**\n\`・\`**wyłącz**`

        }

    }

}


exports.info = {

    name: 'autoMod',
    aliases: ["automod", "automatycznnymoderator"],
    description: '> **Włącza automatyczną moderację na twoim serwerze**',
    category: 'Ustawienia',
    permissions: 'MANAGE_GUILD',
    usage: '<włącz / wyłącz>'

}