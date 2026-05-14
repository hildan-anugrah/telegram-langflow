const botController = require('../controllers/botController');

/**
 * Setup bot routes (commands and listeners)
 * @param {import('telegraf').Telegraf} bot 
 */
const setupRoutes = (bot) => {
    // Command /start
    bot.start((ctx) => botController.welcome(ctx));

    // Command /owner
    bot.command('owner', (ctx) => botController.ownerInfo(ctx));

    // Handle text messages
    bot.on('text', (ctx) => botController.handleChat(ctx));

    // Handle any other message type (photos, stickers, etc.)
    bot.on('message', (ctx) => botController.handleNonText(ctx));
};

module.exports = setupRoutes;
