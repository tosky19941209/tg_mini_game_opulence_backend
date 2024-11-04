const mongoose = require("mongoose")

const user = new mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    tgUserId: {
        type: Number,
        required: false
    },
    realName: {
        type: String,
        required: false
    },
    avatarUrl: {
        type: String,
        required: false
    }
})

const UserModel = mongoose.model("user", user)

module.exports = UserModel