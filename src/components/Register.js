import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';

function Register() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate(); // ✅ 여기서 직접 navigate 사용

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        account,
        password,
        nickname,
      };

      const response = await ApiService.post('/api/auth/register', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204 || response.status === 200) {
        alert('회원가입 성공!');
        navigate('/login'); // ✅ 직접 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
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
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <button type="submit">가입하기</button>
    </form>
  );
}

export default Register;