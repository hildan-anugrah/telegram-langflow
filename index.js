require('dotenv').config();
const { Telegraf } = require('telegraf');
const crypto = require('crypto');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;

    await ctx.sendChatAction('typing');

    const payload = {
        "output_type": "chat",
        "input_type": "chat",
        "input_value": userMessage,
        "session_id": crypto.randomUUID()
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.LANGFLOW_API_KEY
        },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetch(process.env.LANGFLOW_URL, options);
        const data = await response.json();

        const botReply = data.outputs[0].outputs[0].results.message.text;

        await ctx.reply(botReply);

    } catch (err) {
        console.error("Error Bro:", err);
        await ctx.reply("Duh, server AI-nya lagi bengong. Coba lagi nanti ya.");
    }
});

bot.launch().then(() => console.log('Bot Telegram Langflow Ready!'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
