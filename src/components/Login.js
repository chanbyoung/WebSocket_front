import React, { useState } from 'react';
import ApiService from '../services/ApiService';

function Login({ onLogin }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new URLSearchParams();
    formData.append('account', account);   // 🔑 Spring Security의 username 파라미터 설정과 일치
    formData.append('password', password); // 🔑 password 파라미터
  
    try {
      const response = await ApiService.post('/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      alert('로그인 성공!');
      const user = response.data;
      onLogin(user);
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