const { MessageEmbed } = require("discord.js")

exports.run = async (client, message) => {

    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.member.hasPermission("MANAGE_MESSAGES")) return

    const db = client.db

    const antyInvite = db.prepare("SELECT * FROM autoMod WHERE guildID = ?").get(message.guild.id)

    if (antyInvite) {

        let invite = false

        const invites = ["discord.gg/", "discord.com/invite", "discordapp.com/invite", "nadsc.pl", "marketingbot.tk", "market-bot.pl"]

        invites.forEach(inv => {
            if (message.content.includes(inv)) invite = true
        })

        if (invite) {

            message.delete()

            const inviteEmbed = new MessageEmbed()
                .setAuthor(`<:spierdalaj_pan:810465259256414259> • AntyInvite`, client.user.displayAvatarURL())
                .setColor(client.config.embedErrorColor)
                .setDescription(`> **${message.author.tag} (\`${message.author.id}\`) wysłał zaproszenie na serwer!**`)
                .setFooter(`Chcesz wyłączyć AutoModerację? Użyj komendy: ?automod off`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(inviteEmbed)

        }

    }

}