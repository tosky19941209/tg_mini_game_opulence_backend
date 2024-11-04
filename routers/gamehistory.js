const express = require("express")
const router = express.Router()
const GameHistoryController = require("../controller/gamehistory.controller")

router.post('/getGameHistory', GameHistoryController.get_Game_History)

module.exports = router