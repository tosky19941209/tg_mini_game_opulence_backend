const UserModel = require("../models/users")
const DatabaseController = require("./database.controller")

exports.SetUser = async (req, res) => {
    try {
        const { user, tgUserId, realName, avatarUrl } = req.body

        const users = await DatabaseController.search_userTgId(tgUserId)
        if (users.length > 0) {
            res.status(200).json({ message: "user is already existed." })
            return
        }

        const isUserSaved = await DatabaseController.save_new_user(user, tgUserId, realName, avatarUrl)
        const newUser = await DatabaseController.get_userId(tgUserId)
        const newUserId = newUser._id
        const isBalanced = await DatabaseController.save_newuser_first_freetoken_0_balance(newUserId)
        res.status(200).json({ message: { user: isUserSaved, tokenBalance: isBalanced } })

    } catch (err) {
        res.status(200).json({ message: err })
    }
}   