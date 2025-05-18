document.addEventListener('DOMContentLoaded', () => {
    const chatbot = document.getElementById('chatbot');
    const toggleBtn = document.getElementById('chatbot-toggle');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    toggleBtn.addEventListener('click', () => {
        chatbot.style.display = chatbot.style.display === 'block' ? 'none' : 'block';
    });

    sendBtn.addEventListener('click', () => {
        const userMessage = input.value.trim();
        if (userMessage) {
            addMessage('You', userMessage);
            respondToMessage(userMessage);
            input.value = '';
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = `${sender}: ${text}`;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function respondToMessage(message) {
        let response = "I'm a simple AI assistant. How can I help you today?";
        if (message.toLowerCase().includes('cybersecurity')) {
            response = "Cybersecurity is my specialty! Ask me about tools, projects, or tips!";
        } else if (message.toLowerCase().includes('hi') || message.toLowerCase().includes('hello')) {
            response = "Hello there! Ready to talk tech?";
        }
        setTimeout(() => addMessage('AI', response), 500);
    }
});