const { readdirSync } = require("fs")
const { sep } = require("path")

module.exports = client => {

    const loadevn = () => {

        readdirSync("./Events/").forEach(dirs => {

            const events = readdirSync(`./Events/${sep}${dirs}${sep}`).filter(

                files => files.endsWith(".js")

            )

            for (let file of events) {

                file = file.toLowerCase()

                const wyd = require(`../Events/${dirs}/${file}`)
                console.log(`Załadowano wydarzenie: ${dirs}/${file}`)
                client.on(file.split(".")[0], (...args) => wyd.run(client, ...args))

            }

        })

    }

    loadevn()

}