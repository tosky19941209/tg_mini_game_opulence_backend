const FriendModel = require("../models/friends")
const DatabaseController = require("../controller/database.controller")
const FreeTokenModel = require("../models/freetoken")
exports.get_friend_list = async (req, res) => {
    const { tgUserId } = req.body
    const friendsList1 = await FriendModel.find({ tgUserId: tgUserId })
    const friendsList2 = await FriendModel.find({ friendId: tgUserId })
    let _friendTgUserIdlist = []
    console.log(friendsList1)
    console.log(friendsList2)
    if (friendsList2.length > 0) {
        friendsList2.map(item => _friendTgUserIdlist.push(item.tgUserId))
    }

    if (friendsList1.length > 0) {
        friendsList1.map(item => _friendTgUserIdlist.push(item.friendId))
    }

    let friendList = []
    await Promise.all(
        _friendTgUserIdlist.map(async item => {
            const _friendItem = await DatabaseController.search_userTgId(item)
            const userId = await DatabaseController.get_userId(item)
            const tokenAmount = await FreeTokenModel.find({ userId })
            const friendItem = _friendItem[0]
            console.log("f=>", friendItem)
            friendList.push({
                realName: friendItem.realName,
                avatarUrl: friendItem.avatarUrl,
                balance: tokenAmount[0].balance
            })
        })
    )
    res.status(200).json({ message: friendList })
}