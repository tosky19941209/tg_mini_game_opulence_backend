const FriendModel = require("../models/friends")
const DatabaseController = require("../controller/database.controller")
const FreeTokenModel = require("../models/freetoken")

exports.getProfileAvatar = async (userId, bot_token) => {
    try {

        const profilesResponse = await fetch(`https://api.telegram.org/bot${bot_token}/getUserProfilePhotos?user_id=${userId}`);
        const profiles = await profilesResponse.json();

        if (profiles.result.photos.length > 0) {
            const fileResponse = await fetch(`https://api.telegram.org/bot${bot_token}/getFile?file_id=${profiles.result.photos[0][2].file_id}`);
            const filePath = await fileResponse.json();

            const userAvatarUrl = `https://api.telegram.org/file/bot${bot_token}/${filePath.result.file_path}`;
            return userAvatarUrl;
        } else {
            console.log('No profile photos found.');
        }
    } catch (error) {
        console.error('Error fetching profile photos:', error);
    }
}


exports.isFriendExisted = async (tgUserId, friendId) => {
    const friends1 = await FriendModel.find({ tgUserId: tgUserId, friendId: friendId })
    const friends2 = await FriendModel.find({ tgUserId: friendId, friendId: tgUserId })
    if (friends1.length > 0) return false
    else if (friends2.length > 0) return false
    else return true
}

exports.save_friend_info = async (tgUserId, friendId) => {
    if (await this.isFriendExisted(tgUserId, friendId) === false) return

    const newFriend = new FriendModel({
        tgUserId,
        friendId,
    })

    await newFriend.save()
}

exports.provide_token_25 = async (tgUserId, friendId) => {

    const userId = await DatabaseController.get_userId(friendId)
    if (userId === false) {
        res.status(200).json({ message: false, content: "user is not existed" })
        return
    }

    const _previousTokenAmount = await FreeTokenModel.find({ userId })
    const previousTokenAmount = _previousTokenAmount[0].balance
    const newTokenAmount = 25
    await FreeTokenModel.findOneAndUpdate(
        { userId: userId },
        {
            userId: userId,
            balance: previousTokenAmount + newTokenAmount
        })

    const myUserId = await DatabaseController.get_userId(tgUserId)

    const newFreeToken = new FreeTokenModel({
        userId: myUserId,
        balance: newTokenAmount
    })
    await newFreeToken.save()
    console.log("Token received!")
}