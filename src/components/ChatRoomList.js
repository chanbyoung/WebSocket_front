// src/components/ChatRoomList.js
import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

function ChatRoomList() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const navigate = useNavigate(); // ← URL 이동용

  const fetchRooms = async () => {
    try {
      const response = await ApiService.get('/api/chatRoom');
      setRooms(response.data);
    } catch (error) {
      console.error('채팅방 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      await ApiService.post('/api/chatRoom', newRoomName, {
        headers: { 'Content-Type': 'text/plain' },
      });
      setNewRoomName('');
      fetchRooms(); // 생성 후 목록 갱신
    } catch (error) {
      console.error('채팅방 추가 실패:', error);
    }
  };

  const handleEnterRoom = (roomId) => {
    navigate(`/rooms/${roomId}`); // ← URL 변경
  };

  return (
    <div>
      <h2>채팅방 목록</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="채팅방 이름"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button onClick={handleAddRoom}>채팅방 추가</button>
      </div>

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name}
            <button onClick={() => handleEnterRoom(room.id)}>입장</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoomList;