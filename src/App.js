import React, { useState } from 'react';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import ChatRoomList from './components/ChatRoomList';

function App() {
  const [user, setUser] = useState(null);
  const [enteredRoomId, setEnteredRoomId] = useState(null);

  if (!user) return <Login onLogin={setUser} />;

  if (enteredRoomId) return <ChatRoom user={user} roomId={enteredRoomId} />;

  return <ChatRoomList onEnterRoom={setEnteredRoomId} />;
}

export default App;