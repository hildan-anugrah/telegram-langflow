require('dotenv').config();
const { Telegraf } = require('telegraf');
const setupRoutes = require('./routes/botRoutes');

// Initialize the bot
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Setup routes
setupRoutes(bot);

// Launch the bot
bot.launch().then(() => {
    console.log('====================================');
    console.log('🤖 My Kisah Chatbot is Ready!');
    console.log('====================================');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
