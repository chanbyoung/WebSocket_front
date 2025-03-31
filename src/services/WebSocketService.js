import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

class WebSocketService {
  constructor({ roomId, onMessageReceived, onConnect, onDisconnect }) {
    this.roomId = roomId;
    this.onMessageReceived = onMessageReceived;
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
  }

  connect() {
    const socketUrl = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_WEBSOCKET_ENDPOINT}`;
    const socket = new SockJS(socketUrl);
    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket 연결됨');
        if (this.onConnect) this.onConnect();
        stompClient.subscribe(`/topic/public/${this.roomId}`, (message) => {
          const msg = JSON.parse(message.body);
          if (this.onMessageReceived) this.onMessageReceived(msg);
        });
      },
      onStompError: (frame) => {
        console.error('WebSocket 오류: ', frame);
      }
    });
    stompClient.activate();
  }

  disconnect() {
    if (stompClient) {
      stompClient.deactivate();
      if (this.onDisconnect) this.onDisconnect();
    }
  }

  // static 제거 -> 인스턴스 메서드로 변경
  send(message) {
    if (stompClient && stompClient.connected) {
      stompClient.publish({ destination: `/app/chat.sendMessage`, body: JSON.stringify(message) });
    }
  }
}

export default WebSocketService;