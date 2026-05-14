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

    // Handle any text message
    bot.on('text', (ctx) => botController.handleChat(ctx));
};

module.exports = setupRoutes;
