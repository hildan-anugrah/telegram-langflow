const axios = require('axios');
const crypto = require('crypto');

/**
 * Service to handle communication with Langflow API
 */
class LangflowService {
    async processChatMessage(userMessage) {
        const payload = {
            "output_type": "chat",
            "input_type": "chat",
            "input_value": userMessage,
            "session_id": crypto.randomUUID()
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.LANGFLOW_API_KEY
            }
        };

        try {
            const response = await axios.post(process.env.LANGFLOW_URL, payload, config);
            
            // Extracting the message from Langflow response structure
            const botReply = response.data.outputs[0].outputs[0].results.message.text;
            return botReply;

        } catch (err) {
            console.error("Langflow Service Error:", err.response ? err.response.data : err.message);
            throw new Error("Gagal mengambil respon dari AI.");
        }
    }
}

module.exports = new LangflowService();
