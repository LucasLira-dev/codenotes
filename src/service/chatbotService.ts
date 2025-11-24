const chatBot_url = process.env.CHATBOT_URL || ' http://127.0.0.1:8000/api/chat';

export const chatbotService = {
    getAIResponse: async(humanMessage: string) => {
        const response = await fetch(chatBot_url, {
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

        console.log(data.resposta)
        return data.resposta;
    }
};
