import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './ChatWidget.css';
import { initChat } from './chat.js';

const ChatWidget = () => {
    useEffect(() => {
        const widgetHTML = `
        <div id="chat-widget">
            <button id="chat-widget-button">Chat</button>
            <div id="chat-window" style="display: none;">
                <div id="chat-header">
                    <span>Support InfraForge</span>
                    <button id="chat-close-button">&times;</button>
                </div>
                <div id="chat-messages">
                    <div class="message bot">Здравствуйте! Чем я могу вам помочь?</div>
                    <div class="message user">Привет! Расскажите о проекте.</div>
                </div>
                <form id="chat-input-form">
                    <input type="text" id="chat-input-field" placeholder="Введите сообщение..." required>
                    <button type="submit" id="chat-send-button">Send</button>
                </form>
            </div>
        </div>
        `;
        
        if (!document.getElementById('chat-widget')) {
            const div = document.createElement('div');
            div.innerHTML = widgetHTML;
            document.body.appendChild(div);
            initChat();
        }
    }, []);

    return null;
};

export default ChatWidget;
