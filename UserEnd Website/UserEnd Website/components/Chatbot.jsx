// ChatBot.jsx

import React, { useState } from 'react';
import styles from '../components/Chatbot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    // Placeholder: Just adding a random message for demonstration
    const newMessage = {
      text: inputText,
      isUser: true,
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className={styles.chatBot}>
      <div className={styles.chatArea}>
        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? styles.userMessage : styles.botMessage}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
