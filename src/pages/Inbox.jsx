import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import { IoIosArrowBack } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import "../index.scss";

const InboxPage = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Keep one instance of error state
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const chatMessagesEndRef = useRef(null);
  const chatMessagesContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [userId, setUserId] = useState(null);
  const { userId1 } = useParams();
  useEffect(() => {
    if (userId1) {
      handleConversationClick(userId1); 
    }
  }, [userId1]);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("https://www.youthsthought.com/backend/check_auth.php", {
          credentials: "include", 
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }

        const data = await response.json();

        if (data.user_id) {
          setUserId(data.user_id);
        } else if (data.error) {
          setError(data.error);
        }
      } catch (error) {
        setError("Error fetching user ID");
      }
    };

    fetchUserId();
  }, []);

  const timeAgo = (timestamp) => {

    if (!timestamp) return "Just now";

    const then = new Date(timestamp);
    if (isNaN(then.getTime())) return "N/A";

    const now = new Date();
    const diffInSeconds = Math.floor((now - then) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour(s) ago`;

    return `${Math.floor(diffInSeconds / 86400)} day(s) ago`;
};
useEffect(() => {
  if (autoScroll) {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages, autoScroll]);

useEffect(() => {
  const fetchConversations = async () => {
  try {
      const response = await fetch("https://www.youthsthought.com/backend/conversation.php", {
          credentials: "include",
      });
      if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
      }
      const data = await response.json();
      setConversations(data);
  } catch (error) {
      console.error('Error fetching conversations:', error.message);
      setError(error.message);
  } finally {
      setLoading(false);
  }
};



  fetchConversations();

  const interval = setInterval(() => {
      fetchConversations();
      if (activeConversation) {
          fetchMessages(activeConversation);
      }
  }, 5000);

  return () => clearInterval(interval);
}, [activeConversation]);

const fetchMessages = async (conversationId) => {
  try {
    setLoading(true);
    const response = await fetch(`https://www.youthsthought.com/backend/messages.php?otherUserId=${conversationId}`, { credentials: "include" });
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    setMessages(data);
    setAutoScroll(true);
  } catch (error) {
    console.error("Error fetching messages:", error);
    setError("Failed to fetch messages");
  } finally {
    setLoading(false);
  }
};


  const markMessagesAsSeen = async (conversationId) => {
    try {
        const response = await fetch('https://www.youthsthought.com/backend/mark_messages_seen.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `conversation_id=${conversationId}`,
            credentials: 'include',
        });
        const data = await response.json();
        if (!data.success) {
            console.log('Failed to mark messages as seen');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  const insertMessage = (conversationId) => {
    if (messageText.trim() === '' && !selectedImage) return;

    const formData = new FormData();
    formData.append('conversation_id', conversationId);
    if (messageText.trim() !== '') {
      formData.append('message', messageText);
    }
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    fetch('https://www.youthsthought.com/backend/insert_message.php', {
      method: 'POST',
  body: formData,
  credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: data.messageId,
            text: messageText,
            msg_time: new Date().toISOString(),
            sender: "me",
            media: data.imagePath || null,
          },
        ]);
        setMessageText('');
        setSelectedImage(null);
        setAutoScroll(true);
      } else {
        console.error('Failed to send message:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const handleConversationClick = (conversationId) => {
    setActiveConversation(conversationId);
    fetchMessages(conversationId);
    markMessagesAsSeen(conversationId);
    setAutoScroll(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleScroll = (event) => {
    const container = event.target;
    const bottom = container.scrollHeight === container.scrollTop + container.clientHeight;
    if (bottom) {
      setAutoScroll(true);
    } else {
      setAutoScroll(false);
    }
  };

  return (
    <div className="inbox-page">
      <TopNavbar />
      <div className="main-container">
        <Sidebar />
        <div className={`content ${isMobileView ? 'mobile-view' : ''}`}>
          <div className="conversations-list">
            {(
              conversations.map((conversation) => (
                <div
                  className={`conversation-item ${activeConversation === conversation.id ? "active" : ""}`}
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation.id)}
                >
                  <img src={conversation.profilePic} alt="Profile" className="conversation-profile-pic" />
                  
                  <div className="conversation-info">
                    <span className="conversation-name">{conversation.name}</span>
                  <b>{userId === conversation.id ? conversation.seen === 0 ? "- unread" : "" : ""}</b><br/>
                    <span className="conversation-last-message">
                    {conversation.lastMessage !== null ? (
  <span className='message-text'>{conversation.lastMessage}</span>
) : (
  <span className='image-placeholder' style={{ display: 'flex' }}>
  <CiImageOn style={{ marginRight: '3px' }} /> Image
</span>
)}
</span>
                    <span className="conversation-date">- {timeAgo(conversation.date)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="chat-window">
            {activeConversation ? (
              <>
                <div className="chat-header">
                    {isMobileView && (
                      <button className="back-button" onClick={() => setActiveConversation(null)}>
                        <IoIosArrowBack size={24} />
                      </button>
                    )}
                    <h2>
                      Chat with{" "}
                      {conversations.find((conv) => conv.id === activeConversation)?.name}
                    </h2>
                </div>

                <div className="chat-messages" ref={chatMessagesContainerRef} onScroll={handleScroll}>
                  {messages.length === 0 ? (
                    <p>No messages</p>
                  ) : (
                    messages.map((message) => (
                      <div className={`chat-message ${message.sender === "me" ? "sent" : "received"}`} key={message.id}>
                        {
                          message.media && (
                            <img 
                              src={`https://www.youthsthought.com/backend/${message.media}`} 
                              alt="Message Media" 
                              className="message-image" 
                            />
                          )
                        }
                        {message.text !== null && message.text !== undefined ? (<span className='message-text'>{message.text}</span>) : null}

                        <span className="message-timestamp">{timeAgo(message.timestamp)}</span> {/* Ensure timestamp is passed here */}
                      </div>
                    ))
                    
                  )}
                  <div ref={chatMessagesEndRef} />
                </div>
                <div className="chat-input">
                  <div className="form__group">
                    <input
                      type="text"
                      className="form__field"
                      placeholder="Type a message..."
                      name="message"
                      id="message"
                      required
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <label htmlFor="message" className="form__label">
                      Type a message...
                    </label>
                  </div>
                  <input type="file" onChange={handleImageChange} accept="image/*" />
                  <button onClick={() => insertMessage(activeConversation)}>Send</button>
                </div>
              </>
            ) : (
              <div className="select-conversation-message">
                <p>Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default InboxPage;
