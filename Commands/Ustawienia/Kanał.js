exports.run = async (client, message, args) => {

    const db = client.db
    const channel = message.mentions.channels.first()
    let errored = false
    let invite

    if (!channel || !message.guild.channels.cache.get(channel.id) || channel.type !== "text")
        return {

            embed: {

                type: "error",
                desc: "> **Podany przez ciebie kanał __musi__ być kanałem tekstowym!**"

            }

        }

    let blocked = false
    await channel.permissionOverwrites.forEach(p => {
        const perms = channel.permissionsFor(p.id).serialize()
        if (perms["VIEW_CHANNEL"] === false || perms["READ_MESSAGE_HISTORY"] === false) blocked = true
    })

    if (blocked === true)
        return {

            embed: {

                type: "error",
                desc: "> **Kanał reklam musi mieć zezwoloną permisję `Wyświetlanie Kanału` oraz `Czytanie Historii Czatu` dla @everyone"

            }

        }

    try {
        await channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        })
    } catch (e) {
        errored = true
    }

    try {
        invite = await channel.createInvite({ maxAge: 0 })
    } catch (e) {
        errored = true
    }

    if (errored === true)
        return {

            embed: {

                type: "error",
                desc: "> **Bot nie może zmienić permisji kanału!**"

            }

        }

    const data = db.prepare("SELECT * FROM adSettings WHERE guildID = ?").get(message.guild.id)
    if (data) {

        db.prepare("UPDATE adSettings SET channelID = ? WHERE guildID = ?").run(channel.id, message.guild.id)
        db.prepare("UPDATE adSettings SET invite = ? WHERE guildID = ?").run(`https://discord.gg/${invite.code}`, message.guild.id)

    } else {

        db.prepare("INSERT INTO adSettings (guildID, channelID, invite) VALUES(?,?,?)").run(message.guild.id, channel.id, `https://discord.gg/${invite.code}`)

    }

    return {

        embed: {

            type: "success",
            title: "Kanał reklam",
            emoji: ":gear:",
            desc: `> **Kanał reklam został pomyślnie ustawiony!**`

        }

    }


}


exports.info = {

    name: 'kanał',
    aliases: ["channel", "kanal"],
    description: 'Ustawia kanałreklam.',
    category: 'Ustawienia',
    permissions: 'MANAGE_GUILD',
    usage: '<#kanał>'

}