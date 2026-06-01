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
    
    // Проверяем наличие кнопки закрытия перед добавлением обработчика
    if (closeButton) {
        closeButton.addEventListener('click', toggleChat);
    }

    // Render message to the UI
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Loading indicator
    const setCastingState = (isLoading) => {
        if (isLoading) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message bot loading';
            loadingDiv.id = 'chat-loading';
            loadingDiv.textContent = 'Typing...';
            messagesContainer.appendChild(loadingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            if (sendButton) sendButton.disabled = true;
            if (inputField) inputField.disabled = true;
        } else {
            const loadingDiv = document.getElementById('chat-loading');
            if (loadingDiv) loadingDiv.remove();
            if (sendButton) sendButton.disabled = false;
            if (inputField) inputField.disabled = false;
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
            // Use data.answer, retern backenf (chat.ts)
            addMessage(data.answer || 'Не удалось получить ответ', 'bot');
        } catch (error) {
            addMessage(`Error: ${error.message}`, 'bot');
        } finally {
            setCastingState(false);
        }
    };

    if (inputForm) {
        inputForm.addEventListener('submit', handleSend);
    }
};

// Keep compatibility for static HTML
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }
}