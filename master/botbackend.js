module.exports = () => {
    console.log("Bot-Backend is running!")
    const TGBot = require("node-Telegram-bot-api")
    const BotController = require("../controller/bot.controller")
    const DatabaseController = require("../controller/database.controller")
    const dotenv = require("dotenv")
    const token = "748pEzrvnjgPvuRSYMOgSG9WRdyDg4"
    const bot = new TGBot(token, {
        polling: true, request: {
            agentOptions: {
                keepAlive: true,
                family: 4
            }
        }
    })

    const BotMenu = [
        { command: "start", description: "Welcome" },
        { command: "help", description: "Help" },
        { command: "setting", description: "Setting" }
    ];

    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "🚀 PLAY CLICK 🚀",
                        web_app: {
                            url: "https://openxu-tg-minigame-test.vercel.app"
                        }
                    }
                ]
            ]
        }
    };

    bot.setMyCommands(BotMenu);
    bot.onText(/\/start/, (msg) => {
        const userID = msg.from.id;
        chatId = msg.chat.id;
        const welcomeMessage = "Start your journey now! Play and earn rewards in the Bear Jumping game!💰";
        // Send the welcome message with the inline keyboard
        bot.sendMessage(chatId, welcomeMessage, options);
    });

    bot.onText(/\/setting/, (msg) => {
        const chatId = msg.chat.id;
        const settingMessage = "Hello! Welcome to the Rocket TON Game!"
        bot.sendMessage(chatId, settingMessage)
    })

    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        const settingMessage = "Hello! Welcome to the Rocket TON Game!"
        bot.sendMessage(chatId, settingMessage)
    })

    bot.on("message", async (msg) => {
        const userId = msg.from.id;
        const text = msg.text ? msg.text.trim() : '';
        const frinedId = text.substring(7)
        const avatarUrl = await BotController.getProfileAvatar(userId, token)
        const username = msg.from.username
        const firstName = msg.from.first_name
        const lastName = msg.from.last_name
        let MyRealName
        if (lastName === undefined && firstName !== undefined)
            MyRealName = firstName

        if (lastName !== undefined && firstName === undefined)
            MyRealName = lastName
        if (lastName !== undefined && firstName !== undefined)
            MyRealName = firstName + " " + lastName


        if (userId !== undefined && frinedId !== undefined)
            await BotController.save_friend_info(userId, frinedId)
        const isExistedMyId = await DatabaseController.search_userTgId(userId)
        if (isExistedMyId.length === 0) {
            await DatabaseController.save_new_user(username, userId, MyRealName, avatarUrl)
            await BotController.provide_token_25(userId, frinedId)
        }
    })

}
