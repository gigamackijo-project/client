import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '@recoils/users';

function Profile() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const localstorage = window.localStorage;

  useEffect(() => {
    if (!localstorage.user && user.email === '') {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [localstorage.user, user.email, navigate]);

  const emailLineWidth = `${user?.email.length * 13}px`; 

  return (
    <div>
      <div className="container-fluid page-header py-5 mb-4">
        <h1 className="text-center text-white display-6">My page</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><a href="#">회원정보</a></li>
                <li className="breadcrumb-item active text-white">프로필</li>
            </ol>
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card border rounded p-4 mb-4" style={{ marginTop: '20%', transform: 'scale(1.1)', borderRadius: '0', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <div className="row">
                <div className="col-md-6 text-end border-end">
                  <div className="my-3">
                    <h5 style={{ marginRight: '150px', marginLeft: '-20px' }}>🤍 이름</h5>
                  </div>
                  <div className="my-3">
                    <h5 style={{ marginRight: '130px', marginLeft: '-20px' }}>🤍 닉네임</h5>
                  </div>
                  <div className="my-3">
                    <h5 style={{ marginRight: '85px', marginLeft: '-20px' }}>🧡 보유 포인트</h5>
                  </div>
                  <div className="my-3"> 
                    <h5 style={{ marginRight: '110px', marginLeft: '-20px' }}>🤍 전화번호</h5>
                  </div>
                  <div className="my-3">
                    <h5 style={{ marginRight: '130px', marginLeft: '-20px' }}>🤍 이메일</h5>
                  </div>
                </div>
                <div className="col-md-6 text-start ps-4">
                  <div className="my-3">
                    <h5 className="border-bottom" style={{ width: emailLineWidth }}>{user?.name}</h5>
                  </div>
                  <div className="my-3">
                    <h5 className="border-bottom" style={{ width: emailLineWidth }}>{user?.nickname}</h5>
                  </div>
                  <div className="my-3">
                    <h5 className="border-bottom text-secondary" style={{ width: emailLineWidth }}>{user?.point} P</h5>
                  </div>
                  <div className="my-3">
                    <h5 className="border-bottom" style={{ width: emailLineWidth }}>{user.tel || user.id}</h5>
                  </div>
                  <div className="my-3" style={{ borderBottom: `1px solid lightgray`, width: emailLineWidth }}>
                    <h5>{user?.email}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5 mt-5 d-flex justify-content-center"></div>
    </div>
  );
}

export default Profile;
