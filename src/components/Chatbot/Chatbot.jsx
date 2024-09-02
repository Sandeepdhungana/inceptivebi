import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import { useDispatch, useSelector } from "react-redux";
import { chat } from "../../state/chat/chatSlice";
import chatIcon from "../../assets/chat-icon.svg";
import Cross from "../../assets/cross.svg"; 

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const chatInfo = useSelector((state) => state.chatInfo);
  const { botMessage, status, error } = chatInfo;
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const conversationEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (botMessage) {
      const newMessages = botMessage.map((msg) => ({
        message: msg.content,
        sender: "bot",
      }));
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    }
  }, [botMessage]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { message: input, sender: "user" }]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        dispatch(chat({ message: input }));
        setIsTyping(false);
      }, 500);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div
        className={`chatbot-icon ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
      >
         {isOpen ? "✖" : <img src={chatIcon} alt="Chat Icon" className="icon-img" />}
        
      </div>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <img src={Cross} alt="close" onClick={toggleChat} />
          </div>
          <div className="conversation">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.sender}`}>
                {msg.sender === "bot" && <div className="avatar bot"><img src={chatIcon} alt="Chat Icon" className="icon-img" /></div>}
                <div className={`message ${msg.sender}`}>{msg.message}</div>
                {msg.sender === "user" && <div className="avatar user">G</div>}
              </div>
            ))}
            {(status === "loading" || isTyping) && (
              <div className="message-row bot">
                <div className="avatar bot"><img src={chatIcon} alt="Chat Icon" className="icon-img" /></div>
                <div className="message bot typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={conversationEndRef} />
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder="Type Something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
