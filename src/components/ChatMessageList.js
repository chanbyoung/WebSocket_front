import React, { useEffect, useRef, useCallback } from 'react';

function ChatMessageList({ messages, onLoadPrevious }) {
  const containerRef = useRef(null);

  // 스크롤 이벤트 핸들러 (맨 위 도달 시 이전 메시지 요청)
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.scrollTop === 0) {
      onLoadPrevious && onLoadPrevious();
    }
  }, [onLoadPrevious]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // 초기 메시지 로드 시 스크롤을 맨 아래로 이동 (최신 메시지 보기 위함)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
  
    // 메시지가 적어서 스크롤이 생기지 않으면 이전 메시지 자동 로드
    if (container.scrollHeight <= container.clientHeight && onLoadPrevious) {
      onLoadPrevious();
    }
  }, [messages, onLoadPrevious]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '400px',
        overflowY: 'scroll',
        border: '1px solid #ccc',
        padding: '1rem',
      }}
    >
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.senderName}</strong>: {msg.content}
        </div>
      ))}
    </div>
  );
}

export default ChatMessageList;