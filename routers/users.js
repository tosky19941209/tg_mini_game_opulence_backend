const express = require("express")
const router = express.Router()
const userController = require("../controller/user.controller")

router.post("/setuser", userController.SetUser)


module.exports = router