import React, { useCallback, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userState } from '@recoils/users';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';

function Login() {
  const location = useLocation();
  const pathName = location.pathname.substring(1);
  const navigate = useNavigate();
  const setLoginUser = useSetRecoilState(userState);
  const [data, setData] = useState({ email: '', password: '' });

  const changeData = useCallback((evt) => {
    setData((data) => ({ ...data, [evt.target.name]: evt.target.value }));
  }, []);

  const login = useCallback(async (evt) => {
    evt.preventDefault();
    const resp = await axios.post('http://localhost:8000/users/login', data);
    console.log(resp);
    if (resp.data.status === 200) {
      setLoginUser(resp.data.data);
      navigate('/');
      window.location.reload();
    } else if(resp.data.status === 500){
      alert(resp.data.message);
    } else {
      setData({ email: '', password: '' });
    }
  }, [data, setLoginUser, navigate]);


  return (
    <>
      <div className="container-fluid py-5">
        <div className="container py-5" style={{ marginTop: '50px' }}>
          <h1 className="mb-4 text-center">로그인</h1>
          <form onSubmit={login}>
            <div className="row g-5">
              <div className="col-md-12 col-lg-12 col-xl-7 mx-auto">
                <div className="row">
                  <div className="form-item w-100">
                    <label htmlFor="email" className="form-label my-3 fw-bold">
                      아이디
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={data.email}
                      onChange={changeData}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-item">
                  <label htmlFor="password" className="form-label my-3 fw-bold">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={changeData}
                    placeholder="Password"
                    />
                </div>

                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button
                    type="submit"
                    className="btn border-secondary py-3 px-4 text-uppercase text-primary">
                    로그인 하기!
                  </button>
                </div>

                <div className="row g-3 text-center justify-content-center mt-4">
                  <div className="col-auto">
                  <Link className={`${ pathName === 'signup' ? 'nav-link active' : 'nav-link' } form-link fw-bold light-gray-text`} to="/signup">
                      회원가입
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;