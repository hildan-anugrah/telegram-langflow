const langflowService = require('../services/langflowService');

/**
 * Controller to handle bot interactions
 */
class BotController {
    /**
     * Handle /start command
     */
    async welcome(ctx) {
        await ctx.reply('Halo! Saya asisten AI di My Kisah Chatbot. Ada yang bisa saya bantu hari ini?');
    }

    /**
     * Handle /owner command
     */
    async ownerInfo(ctx) {
        await ctx.reply('Bot ini dikembangkan oleh Hyell Baik. \n\nHubungi Owner di: @HyellBaik');
    }

    /**
     * Handle incoming text messages
     */
    async handleChat(ctx) {
        const userMessage = ctx.message.text;
        const userId = ctx.from.id; // Menggunakan ID User sebagai session agar ada memori

        try {
            await ctx.sendChatAction('typing');
            
            // Kirim pesan ke service dengan userId sebagai sessionId
            const botReply = await langflowService.processChatMessage(userMessage, userId);
            
            await ctx.reply(botReply);

        } catch (err) {
            console.error("Bot Controller Error:", err);
            await ctx.reply("Duh, server AI-nya lagi bengong. Coba lagi nanti ya.");
        }
    }

    /**
     * Handle non-text messages (images, stickers, etc.)
     */
    async handleNonText(ctx) {
        await ctx.reply("Maaf ya, saat ini saya baru bisa mengerti pesan berupa teks saja. 😊");
    }
}

module.exports = new BotController();
