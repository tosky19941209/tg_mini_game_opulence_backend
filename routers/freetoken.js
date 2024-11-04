const express = require("express")
const router = express.Router()
const FreeTokenController = require("../controller/freetoken.controller")

router.post('/getDailyClaim', FreeTokenController.GetDailyClaim)
router.post('/isDailyClaim', FreeTokenController.isDailyClaimAvailable)
router.post('/todayClaimAmount', FreeTokenController.TodayClaimAmount)
router.post('/currentBalance', FreeTokenController.CurrentBalance)
router.post('/getTokenByGame', FreeTokenController.GetTokenByGame)
module.exports = router