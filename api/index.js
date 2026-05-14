const { Telegraf } = require('telegraf');
const setupRoutes = require('../routes/botRoutes');

// Load environment variables (Vercel sets these automatically in production)
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Setup the same routes used in local version
setupRoutes(bot);

/**
 * Vercel Serverless Function handler
 */
module.exports = async (req, res) => {
    try {
        // Hanya proses request POST dari Telegram
        if (req.method === 'POST') {
            await bot.handleUpdate(req.body);
            return res.status(200).json({ message: 'OK' });
        }
        
        // Jika diakses via browser (GET), tampilkan pesan status
        return res.status(200).send('Bot is running properly on Vercel! 🤖');
        
    } catch (err) {
        console.error('Webhook Error:', err);
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};
