import { sendMessage } from './api.js';

export const initChat = () => {
    const widgetButton = document.getElementById('chat-widget-button');
    const chatWindow = document.getElementById('chat-window');
    const closeButton = document.getElementById('chat-close-button');
    const messagesContainer = document.getElementById('chat-messages');
    const inputForm = document.getElementById('chat-input-form');
    const inputField = document.getElementById('chat-input-field');
    const sendButton = document.getElementById('chat-send-button');

    if (!widgetButton || !chatWindow) return;

    // Toggle chat window visibility
    const toggleChat = () => {
        const isHidden = chatWindow.style.display === 'none';
        chatWindow.style.display = isHidden ? 'flex' : 'none';
    };

    widgetButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', toggleChat);

    // Render message to the UI
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // Loading indicator
    const setCastingState = (isLoading) => {
        if (isLoading) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message bot loading';
            loadingDiv.id = 'chat-loading';
            loadingDiv.textContent = 'Печатает...';
            messagesContainer.appendChild(loadingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            sendButton.disabled = true;
            inputField.disabled = true;
        } else {
            const loadingDiv = document.getElementById('chat-loading');
            if (loadingDiv) loadingDiv.remove();
            sendButton.disabled = false;
            inputField.disabled = false;
        }
    };

    // Handle sending message
    const handleSend = async (e) => {
        e.preventDefault();
        const text = inputField.value.trim();
        if (!text) return;

        // User message
        addMessage(text, 'user');
        inputField.value = '';
        
        setCastingState(true);

        try {
            const data = await sendMessage(text);
            // Assuming response format: { response: "..." }
            addMessage(data.response || data.message || 'Ответ получен', 'bot');
        } catch (error) {
            addMessage(`Ошибка: ${error.message}`, 'bot');
        } finally {
            setCastingState(false);
        }
    };

    inputForm.addEventListener('submit', handleSend);
};

// Keep compatibility for static HTML
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initChat);
}
