import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import { useDispatch, useSelector } from "react-redux";
import { chat } from "../../state/chat/chatSlice";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const chatInfo = useSelector((state) => state.chatInfo);
  const { botMessage, status, error } = chatInfo;
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const conversationEndRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processing, setProcessing] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  function parseMessage(text) {
    if (text) {
      const urlPatternExists = /\[\[(.*?)\]\]/.test(text);
      const listPatternExists = /\(\[(.*?)\]\)/.test(text);

      if (urlPatternExists) {
        const urlRegex = /\[\[(.*?)\]\]/;
        const textRegex = /^(.*?)\s*\[\[.*?\]\]/;

        const urlMatch = text.match(urlRegex);
        const url = urlMatch ? urlMatch[1] : "No URL found";

        const textMatch = text.match(textRegex);
        const regularText = textMatch ? textMatch[1] : text;

        return (
          <>
            {regularText} <a href={`mailto:${url}`}>{url}</a>
          </>
        );
      } else if (listPatternExists) {
        const listRegex = /\(\[(.*?)\]\)/;
        const textRegex = /^(.*?)\s*\([^)]*\)/;

        const urlMatch = text.match(listRegex);
        const list = urlMatch ? urlMatch[1].split(",") : [];

        const textMatch = text.match(textRegex);
        const regularText = textMatch ? textMatch[1] : text;

        return (
          <>
            {regularText}
            <ul>
              {list.map((item, index) => (
                <li key={index}> {item}</li>
              ))}
            </ul>
          </>
        );
      } else {
        return text;
      }
    }
    return text;
  }

  useEffect(() => {
    if (botMessage) {
      const newMessages = botMessage.map((msg) => ({
        message: parseMessage(msg.content),
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

      if (input.toLowerCase().includes("provide the elements")) {
        setProcessing(true);
        setTimeout(() => {
          const response = {
            message: (
              <>
                Certainly, I shall assist you with this
                <ul>
                  <li>
                    Database/Dataset:{" "}
                    <a
                      href="https://superset.edtechmarks.com/explore/?datasource_type=table&datasource_id=18"
                      target="_blank"
                    >
                      {" "}
                      TermAid-Report_API_Main_SAP_qry
                    </a>
                  </li>
                  <li>
                    Charts:{" "}
                    <>
                      <a href="https://superset.edtechmarks.com/explore/?slice_id=3">
                        TermAid-Report_API_Crosstab1
                      </a>
                    </>
                    ,<br />
                    <a href="https://superset.edtechmarks.com/explore/?slice_id=2">
                      TermAid-Report_API_Combination Chart2
                    </a>
                    ,<br />
                    <a href="https://superset.edtechmarks.com/explore/?slice_id=1">
                      TermAid-Report_API_List1
                    </a>
                  </li>
                  <li>
                    Dashboard:{" "}
                    <a href="https://superset.edtechmarks.com/superset/dashboard/1/">
                      Dashboard
                    </a>
                  </li>
                </ul>
                Is this information useful?{" "}
                <button
                  className="chat-btn"
                  onClick={() => handleConfirmation(true)}
                >
                  Yes
                </button>{" "}
                <button
                  className="chat-btn"
                  onClick={() => handleConfirmation(false)}
                >
                  No
                </button>
              </>
            ),
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, response]);
          setIsTyping(false);
          setShowConfirmation(true);
          setProcessing(false);
        }, 5000);
      } else {
        dispatch(chat({ message: input }));
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleConfirmation = (isYes) => {
    setShowConfirmation(false);
    const response = {
      message: isYes
        ? "Glad I was of help to you"
        : "Thank you for your feedback.",
      sender: "bot",
    };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, response]);
    }, 100);
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
        {isOpen ? "✖" : "💬"}
      </div>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>InceptiveBI Bot</h3>
          </div>
          <div className="conversation">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.sender}`}>
                {msg.sender === "bot" && <div className="avatar bot">🤖</div>}
                <div className={`message ${msg.sender}`}>{msg.message}</div>
                {msg.sender === "user" && <div className="avatar user">😀</div>}
              </div>
            ))}
            {(status === "loading" || processing) && (
              <div className="message-row bot">
                <div className="avatar bot">🤖</div>
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
              placeholder="Type a message..."
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
