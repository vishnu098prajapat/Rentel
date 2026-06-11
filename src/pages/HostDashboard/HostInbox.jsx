import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import styles from './HostTabs.module.css';

const initialChats = [
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    time: '10:45 AM', 
    property: 'Royal Heritage Villa', 
    color: '#4318FF',
    messages: [
      { id: 1, sender: 'guest', text: 'Hi! We are very excited about our upcoming trip. Could you please confirm if early check-in is possible around 11 AM?' },
      { id: 2, sender: 'host', text: 'Hello Rahul! Early check-in is definitely possible. The previous guests are leaving early, so the villa will be ready by 11 AM.' },
      { id: 3, sender: 'guest', text: "That's perfect. Looking forward to the stay!" }
    ]
  },
  { 
    id: 2, 
    name: 'Priya Patel', 
    time: 'Yesterday', 
    property: 'Minimalist Studio', 
    color: '#FF5630',
    messages: [
      { id: 1, sender: 'guest', text: 'Is the pool heated?' },
      { id: 2, sender: 'host', text: 'Hi Priya, yes the pool is temperature-controlled and heated during winters.' }
    ]
  },
  { 
    id: 3, 
    name: 'Aman Singh', 
    time: 'Sep 24', 
    property: 'Royal Heritage Villa', 
    color: '#05CD99',
    messages: [
      { id: 1, sender: 'guest', text: 'Thank you for hosting us. We had a great time!' },
      { id: 2, sender: 'host', text: 'Glad you enjoyed your stay, Aman! Hope to see you again.' }
    ]
  },
];

const HostInbox = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(1);
  const [msgInput, setMsgInput] = useState('');
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!msgInput.trim()) return;

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { id: Date.now(), sender: 'host', text: msgInput }],
          time: 'Just now'
        };
      }
      return chat;
    }));
    setMsgInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className={styles.tabHeader} style={{ marginBottom: '24px' }}>
        <div>
          <h1 className={styles.pageTitle}>Inbox</h1>
          <p className={styles.pageSubtitle}>Communicate with your guests directly.</p>
        </div>
      </div>

      <div className={styles.inboxContainer}>
        {/* Sidebar List */}
        <div className={styles.inboxSidebar}>
          <div className={styles.inboxHeader}>All Messages</div>
          <div className={styles.chatList}>
            {chats.map(chat => {
              const lastMessage = chat.messages[chat.messages.length - 1];
              return (
                <div 
                  key={chat.id} 
                  className={`${styles.chatItem} ${activeChatId === chat.id ? styles.chatItemActive : ''}`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className={styles.chatAvatar} style={{ background: chat.color }}>{chat.name.charAt(0)}</div>
                  <div className={styles.chatInfo}>
                    <div className={styles.chatNameRow}>
                      <span className={styles.chatName}>{chat.name}</span>
                      <span className={styles.chatTime}>{chat.time}</span>
                    </div>
                    <div className={styles.chatSnippet}>{lastMessage ? lastMessage.text : '...'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Message Area */}
        <div className={styles.inboxMain}>
          {activeChat ? (
            <>
              <div className={styles.messageHeader}>
                <div className={styles.chatAvatar} style={{ background: activeChat.color }}>{activeChat.name.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-main)' }}>{activeChat.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Booking: {activeChat.property}</div>
                </div>
              </div>

              <div className={styles.messageArea}>
                {activeChat.messages.map(msg => (
                  <div key={msg.id} className={`${styles.messageBubble} ${msg.sender === 'host' ? styles.messageSent : styles.messageReceived}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className={styles.messageInputArea}>
                <input 
                  type="text" 
                  className={styles.messageInput} 
                  placeholder="Type a message..." 
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className={styles.sendBtn} onClick={handleSendMessage}>
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostInbox;
