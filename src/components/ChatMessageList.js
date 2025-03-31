import React from 'react';

function ChatMessageList({ messages }) {
  return (
    <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '1rem' }}>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.senderName}</strong>: {msg.content}
        </div>
      ))}
    </div>
  );
}

export default ChatMessageList;