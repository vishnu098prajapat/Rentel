import React, { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './HostTabs.module.css';

const dummyChats = [
  { id: 1, name: 'Rahul Sharma', time: '10:45 AM', snippet: 'Looking forward to the stay!', active: true, property: 'Royal Heritage Villa', color: '#4318FF' },
  { id: 2, name: 'Priya Patel', time: 'Yesterday', snippet: 'Is the pool heated?', active: false, property: 'Minimalist Studio', color: '#FF5630' },
  { id: 3, name: 'Aman Singh', time: 'Sep 24', snippet: 'Thank you for hosting us.', active: false, property: 'Royal Heritage Villa', color: '#05CD99' },
];

const HostInbox = () => {
  const [msgInput, setMsgInput] = useState('');

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
            {dummyChats.map(chat => (
              <div key={chat.id} className={`${styles.chatItem} ${chat.active ? styles.chatItemActive : ''}`}>
                <div className={styles.chatAvatar} style={{ background: chat.color }}>{chat.name.charAt(0)}</div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatNameRow}>
                    <span className={styles.chatName}>{chat.name}</span>
                    <span className={styles.chatTime}>{chat.time}</span>
                  </div>
                  <div className={styles.chatSnippet}>{chat.snippet}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Message Area */}
        <div className={styles.inboxMain}>
          <div className={styles.messageHeader}>
            <div className={styles.chatAvatar} style={{ background: '#4318FF' }}>R</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-main)' }}>Rahul Sharma</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Booking: Royal Heritage Villa</div>
            </div>
          </div>

          <div className={styles.messageArea}>
            <div className={`${styles.messageBubble} ${styles.messageReceived}`}>
              Hi! We are very excited about our upcoming trip. Could you please confirm if early check-in is possible around 11 AM?
            </div>
            <div className={`${styles.messageBubble} ${styles.messageSent}`}>
              Hello Rahul! Early check-in is definitely possible. The previous guests are leaving early, so the villa will be ready by 11 AM.
            </div>
            <div className={`${styles.messageBubble} ${styles.messageReceived}`}>
              That's perfect. Looking forward to the stay!
            </div>
          </div>

          <div className={styles.messageInputArea}>
            <input 
              type="text" 
              className={styles.messageInput} 
              placeholder="Type a message..." 
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
            />
            <button className={styles.sendBtn}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostInbox;
