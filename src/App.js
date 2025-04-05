import React, { useState } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Login from './components/Login';
import ChatRoomList from './components/ChatRoomList';
import ChatRoom from './components/ChatRoom';
import Register from './components/Register';

function ChatRoomWithParams({ user }) {
  const { roomId } = useParams(); // ← URL에서 roomId 추출
  return <ChatRoom user={user} roomId={roomId} />;
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? <Navigate to="/rooms" /> : <Login onLogin={setUser} />
        }
      />
      <Route
        path='/register'
        element= {<Register/>}
      /> 
      <Route
        path="/rooms"
        element={
          user ? <ChatRoomList /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/rooms/:roomId"
        element={
          user ? <ChatRoomWithParams user={user} /> : <Navigate to="/login" />
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;