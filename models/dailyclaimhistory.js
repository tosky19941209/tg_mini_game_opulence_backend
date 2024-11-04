const mongoose = require("mongoose")

const dailyclaimhistory = new mongoose.Schema({
    userId: {
        type: mongoose.mongo.ObjectId,
        required: false
    },
    date: {
        type: Date,
        required: false
    },

    daily_amount: {
        type: Number,
        required: false
    }
})

const DailyClaimHistoryModel = mongoose.model("dailyclaimhistory", dailyclaimhistory)
module.exports = DailyClaimHistoryModel
