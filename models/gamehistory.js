const mongoose = require("mongoose")

const gamehistory = new mongoose.Schema({
    userId: {
        type: mongoose.mongo.ObjectId,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    bet: {
        type: Number,
        required: false
    },
    stopcrash: {
        type: Number,
        required: false
    },
    profit: {
        type: Number,
        required: false
    }
})

const GameHistoryModel = mongoose.model("gamehistory", gamehistory)

module.exports = GameHistoryModel