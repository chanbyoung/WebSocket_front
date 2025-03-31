import React, { useState } from 'react';
import ApiService from '../services/ApiService';

function Register({ onRegisterSuccess }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('account', account);
      formData.append('password', password);
      formData.append('nickname', nickname);

      const response = await ApiService.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // ModelAttribute 처리용
        }
      });

      if (response.status === 204) {
        alert('회원가입 성공!');
        onRegisterSuccess(); // 로그인 창으로 이동
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input type="text" placeholder="아이디" value={account} onChange={(e) => setAccount(e.target.value)} required />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
      <button type="submit">가입하기</button>
    </form>
  );
}

export default Register;