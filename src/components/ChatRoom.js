import React, { useEffect, useRef, useState } from 'react';
import WebSocketService from '../services/WebSocketService.js';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';

function ChatRoom({ user, roomId }) {
  const [messages, setMessages] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);
  const wsServiceRef = useRef(null); // ✅ WebSocketService 인스턴스를 참조로 보관

  useEffect(() => {
    const wsService = new WebSocketService({
      roomId,
      onMessageReceived: (msg) => setMessages((prev) => [...prev, msg]),
      onConnect: () => setWsConnected(true),
      onDisconnect: () => setWsConnected(false)
    });

    wsService.connect();
    wsServiceRef.current = wsService;

    return () => wsService.disconnect();
  }, [roomId]);

  const sendMessage = (content) => {
    const message = {
      content,
      chatRoomId: roomId,
      messageType: 'CHAT'
    };
    wsServiceRef.current?.send(message); // ✅ 여기서 안전하게 호출
  };

  return (
    <div>
      <h2>채팅방 {roomId}</h2>
      <div>{wsConnected ? '연결됨' : '연결 중...'}</div>
      <ChatMessageList messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}

export default ChatRoom;