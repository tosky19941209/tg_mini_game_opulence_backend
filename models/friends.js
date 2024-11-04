const mongoose = require("mongoose")

const friends = new mongoose.Schema({
    tgUserId: {
        type: Number,
        required: false,
    },
    friendId: {
        type: Number,
        required: false
    },
    avatarUrl: {
        type: String,
        required: false
    },
    friendRealName: {
        type: String,
        required: false
    }
})

const FriendModel = mongoose.model("friends", friends)

module.exports = FriendModel