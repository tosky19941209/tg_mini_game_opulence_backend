const mongoose = require("mongoose")

const freetoken = new mongoose.Schema({
    userId: {
        type: mongoose.mongo.ObjectId,
        required: false
    },
    balance: {
        type: Number,
        required: false
    },
})

const FreeTokenModel = mongoose.model("freetoken", freetoken)

module.exports = FreeTokenModel