import React, { useState } from 'react';
import ApiService from '../services/ApiService';

function Login({ onLogin }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.post('/api/auth/login', { account, password });

      if (response.status === 200) {
        alert('로그인이 완료되었습니다!');
        const user = { account }; // 또는 response.data가 있다면 그걸 사용
        onLogin(user); // App.js로 유저 정보 전달 → ChatRoom으로 전환
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;