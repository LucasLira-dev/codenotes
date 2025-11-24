// Prefer deployed endpoint but fall back to local API during development
const chatBotUrl = process.env.NEXT_PUBLIC_CHATBOT_URL?.trim() || 'http://127.0.0.1:8000/api/chat';

export const chatbotService = {
    getAIResponse: async(humanMessage: string) => {
        const response = await fetch(chatBotUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pergunta: humanMessage }),
        })

        if (!response.ok) {
            throw new Error('Failed to get AI response');
        }

        const data = await response.json();
        
        return data.resposta;
    }
};
