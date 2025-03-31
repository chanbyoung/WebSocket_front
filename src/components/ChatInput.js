import React, { useState } from 'react';

function ChatInput({ onSend }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') return;
    onSend(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="메시지를 입력하세요"
        style={{ width: '80%' }}
      />
      <button type="submit">전송</button>
    </form>
  );
}

export default ChatInput;