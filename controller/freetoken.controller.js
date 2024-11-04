const UserModel = require("../models/users")
const FreeTokenModel = require("../models/freetoken")
const DailyClaimHistoryModel = require("../models/dailyclaimhistory")
const GameHistoryModel = require("../models/gamehistory")
const DatabaseController = require("./database.controller")
const { token } = require("morgan")

exports.GetDailyClaim = async (req, res) => {
    const { tgUserId, balance } = req.body

    const userId = await DatabaseController.get_userId(tgUserId)
    if (userId === false) {
        res.status(200).json({ message: false, content: "user is not existed" })
        return
    }

    const amountList = await DatabaseController.search_token_balance(userId)
    const amount = amountList[0].balance
    let previousBalance = 0
    if (amount !== null) previousBalance = amount
    const newBalance = previousBalance + balance

    const isDailyClaimAvailable = await DatabaseController.isDailyClaimAvailable(userId)

    if (isDailyClaimAvailable) {
        const isSaved = await DatabaseController.save_new_freetoken_balance(userId, newBalance, balance)
        await DatabaseController.save_Daily_Claim_History(userId, balance)
        res.status(200).json({ message: isSaved })
    } else res.status(200).json({ message: false, content: "Not yet 24 hours" })

}

exports.isDailyClaimAvailable = async (req, res) => {
    const { tgUserId } = req.body
    console.log("isDaily TGID =>", tgUserId)
    const userId = await DatabaseController.get_userId(tgUserId)
    if (userId === false) {
        res.status(200).json({ message: false, content: "user is not existed" })
        return
    }

    res.status(200).json({
        message: await DatabaseController.isDailyClaimAvailable(userId)
    })
}

exports.TodayClaimAmount = async (req, res) => {
    const { tgUserId } = req.body
    res.status(200).json({
        message: 20
    })
}

exports.CurrentBalance = async (req, res) => {
    const { tgUserId } = req.body
    const userId = await DatabaseController.get_userId(tgUserId)
    if (userId === false) {
        res.status(200).json({ message: false, content: "user is not existed" })
        return
    }

    const tokenBalance = await FreeTokenModel.find({ userId })
    res.status(200).json({ message: tokenBalance[0].balance })
}

exports.GetTokenByGame = async (req, res) => {
    const { tgUserId, balance, bet, stopcrash, profit } = req.body

    const userId = await DatabaseController.get_userId(tgUserId)
    if (userId === false) {
        res.status(200).json({ message: false, content: "user is not existed" })
        return
    }

    const amountList = await DatabaseController.search_token_balance(userId)
    const amount = amountList[0].balance
    let previousBalance = 0
    if (amount !== null) previousBalance = amount
    const newBalance = previousBalance + balance

    const isSaved = await DatabaseController.save_new_freetoken_balance(userId, newBalance)
    await DatabaseController.save_game_history(userId, bet, stopcrash, profit, balance)
    res.status(200).json({ message: isSaved })

}
