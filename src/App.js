import React, { useState } from 'react';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user ? (
        <ChatRoom user={user} />
      ) : (
        <Login onLogin={(userInfo) => setUser(userInfo)} />
      )}
    </div>
  );
}

export default App;