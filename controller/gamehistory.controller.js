const GameHistoryModel = require("../models/gamehistory")
const DatabaseController = require("./database.controller")
exports.get_Game_History = async (req, res) => {
    const { tgUserId } = req.body
    const userId = await DatabaseController.get_userId(tgUserId)
    console.log("userId =>", userId)
    if (userId === false) {
        res.status(200).json({ message: false, content: "user is not existed" })
        return
    }

    const history = await GameHistoryModel.find({ userId }).sort({ date: -1 })
    res.status(200).json({ message: history })
}