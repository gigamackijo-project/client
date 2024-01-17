import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

function Logout() {
  const localStorage = window.localStorage;
  localStorage.removeItem('user');

  useEffect(() => {
      alert('로그아웃 성공!');
      window.location.reload();
  },[]);

  return (
    <Navigate to="/" replace={true}></Navigate>
  )
}

export default Logout