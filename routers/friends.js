const express = require("express")
const router = express.Router()
const FriendController = require("../controller/friends.controller")

router.post('/getFriendlist', FriendController.get_friend_list)

module.exports = router