import React, { useEffect, useRef, useState, useCallback } from 'react';
import WebSocketService from '../services/WebSocketService';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import ApiService from '../services/ApiService';

function ChatRoom({ user, roomId }) {
  const [messages, setMessages] = useState([]);
  const [wsConnected, setWsConnected] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const wsServiceRef = useRef(null);

  // 초기 메시지 불러오기
  const loadInitialMessages = useCallback(async () => {
    try {
      const res = await ApiService.get(`/api/chatRoom/${roomId}`);
      const reversedMessages = res.data.messages.messages.reverse();
      setMessages(reversedMessages);
      setHasMore(res.data.messages.hasNext); // hasNext 설정
    } catch (err) {
      console.error('초기 메시지 로드 실패:', err);
    }
  }, [roomId]);

  useEffect(() => {
    loadInitialMessages();

    const wsService = new WebSocketService({
      roomId,
      onMessageReceived: (msg) => {
        // 최신 메시지를 아래에 붙이기 위해 뒤에 추가
        setMessages((prev) => [...prev, msg]);
      },
      onConnect: () => setWsConnected(true),
      onDisconnect: () => setWsConnected(false),
    });
    wsService.connect();
    wsServiceRef.current = wsService;

    return () => wsService.disconnect();
  }, [roomId, loadInitialMessages]);

// 이전 메시지 불러오기 (무한 스크롤)
const loadPreviousMessages = useCallback(async () => {
  if (loadingPrevious || !hasMore || messages.length === 0) return;
  setLoadingPrevious(true);

  const oldestMessage = messages[0]; // 가장 오래된 메시지 기준
  console.log("messages[0]: ", messages[0]);

  try {
    const res = await ApiService.get(`/api/chatRoom/${roomId}/road`, {
      params: {
        lastTimeStamp: oldestMessage.timeStamp,
        lastId: oldestMessage.id,
      },
    });

    const newMessages = res.data.messages;

    // 만약 백엔드가 오래된 순(ASC)으로 준다면 reverse 필수
    const reversedMessages = newMessages.reverse();

    // 위에 붙이기
    setMessages((prev) => [...reversedMessages, ...prev]);

    setHasMore(res.data.hasNext); // hasNext 갱신
  } catch (err) {
    console.error('이전 메시지 로드 실패:', err);
  }

  setLoadingPrevious(false);
}, [loadingPrevious, hasMore, messages, roomId]);

  const sendMessage = (content) => {
    const message = {
      content,
      chatRoomId: roomId,
      messageType: 'CHAT',
    };
    wsServiceRef.current?.send(message);
  };

  return (
    <div>
      <h2>채팅방 {roomId}</h2>
      <div>{wsConnected ? '연결됨' : '연결 중...'}</div>
      <ChatMessageList messages={messages} onLoadPrevious={loadPreviousMessages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}

export default ChatRoom;