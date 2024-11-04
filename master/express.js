module.exports = () => {
    const express = require("express")
    const cors = require("cors")
    const morgan = require("morgan")
    const routers = require("./routers")

    const app = express()

    app.use(morgan("dev"))
    app.use(cors())
    app.use(express.json())

    routers.map(router => {
        app.use(`/api/${router}`, require(`../routers/${router}.js`))
    })


    return app
}