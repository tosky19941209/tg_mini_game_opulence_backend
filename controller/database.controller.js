const UserModel = require("../models/users")
const GameHistoryModel = require("../models/gamehistory")
const FriendsModel = require("../models/friends")
const FreeTokenModel = require("../models/freetoken")
const DailyClaimHistoryModel = require("../models/dailyclaimhistory")
const FriendModel = require("../models/friends")

exports.search_userTgId = async (tgUserId) => {
    const existUsername = await UserModel.find({ tgUserId })
    return existUsername
}

exports.search_Id = async (id) => {
    const existId = await UserModel.findById({ _id: id })
    return existId
}

exports.get_userId = async (tgUserId) => {
    const users = await this.search_userTgId(tgUserId)

    if (users.length === 0) return false

    const userId = users[0]._id
    return userId
}

exports.search_token_balance = async (userId) => {
    const existTokenBalance = await FreeTokenModel.find({ userId: userId })
    return existTokenBalance
}

exports.save_new_user = async (user, tgUserId, realName, avatarUrl) => {
    try {

        const newUser = new UserModel({
            user, tgUserId, realName, avatarUrl
        })
        await newUser.save()
        return true
    } catch (err) {
        return false
    }
}

exports.save_newuser_first_freetoken_0_balance = async (userId) => {
    try {
        const newFreeTokenBalance = new FreeTokenModel({
            userId: userId,
            balance: 0
        })
        await newFreeTokenBalance.save()
        return true
    } catch (err) {
        return false
    }
}

exports.save_new_freetoken_balance = async (userId, newBalance) => {
    try {
        await FreeTokenModel.findOneAndUpdate(
            { userId: userId },
            {
                userId: userId,
                balance: newBalance
            })

        return true
    } catch (err) {
        return false
    }
}

exports.get_difference_time_from_now = async (_latestDate) => {
    const latestDate = new Date(_latestDate); // Replace this with your latest date
    const currentDate = new Date();    // Calculate the difference in milliseconds
    const differenceInMillis = currentDate - latestDate;

    // Convert the difference to seconds, minutes, hours, or days
    const differenceInSeconds = Math.floor(differenceInMillis / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    return differenceInHours
}

exports.isDailyClaimAvailable = async (userId) => {
    const currentDate = new Date()
    const userHistory = await DailyClaimHistoryModel.find({ userId: userId })
    if (userHistory.length === 0) return true

    const dateLists = userHistory.map(item => item.date)
    const latestDate = new Date(Math.max(...dateLists));
    if (this.get_difference_time_from_now(latestDate) > 24) return true
    else return false
}


exports.save_Daily_Claim_History = async (userId, balance) => {
    try {
        const currentDate = new Date()
        const newDailyClaimHistory = new DailyClaimHistoryModel({
            userId: userId,
            date: currentDate,
            daily_amount: balance
        })
        await newDailyClaimHistory.save()
        return true
    } catch (err) {
        return false
    }
}

exports.save_game_history = async (userId, bet, stopcrash, profit, balance) => {
    try {
        if (balance < 0) return true
        const currentDate = new Date()
        const saveHistoryGame = new GameHistoryModel({
            userId: userId,
            date: currentDate,
            bet: bet,
            stopcrash: stopcrash,
            profit: profit
        })

        await saveHistoryGame.save()
        return true

    } catch (err) {
        return false
    }
}

