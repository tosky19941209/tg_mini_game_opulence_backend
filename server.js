const config = require("./env/config")
const express = require("./master/express")
const mongoose = require("./master/mongoose")
const botBackend = require('./master/botbackend')

const app = express()
mongoose()
botBackend()

app.listen(config.port, () => {
    console.log(`${config.emoji} http server is running on ${config.port}.`)
})