import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';


function SignUp() {
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
          email: ''
        },
        mode: 'onBlur'    
      });

      const submitEvent = useCallback(async (data) => {
        try {
          const resp = await axios({
            method: 'POST',
            url: 'http://localhost:8000/users/signup',
            data: data
          })
          console.log(resp);
          if (resp.data.status === 409) {
            console.error('중복된 이메일이 존재합니다.', resp.data);
            setError('email', {
              type: 'manual',
              message: resp.data.message,
            });
    } else if(resp.data.status === 408){
      console.error('중복된 닉네임이 존재합니다.', resp.data);
      setError('nickname', {
        type: 'manual',
        message: resp.data.message,
      });
    } else {
      navigate('/login');
      window.location.reload();
    }
  } catch (error) {
    console.error(error)
  }
      }, [navigate, setError]);
      const errorEvent = (error) => console.error(error)
    
  return (
    <main id="main">
        <div className="container-fluid py-5 mt-5">
            <div className="container py-5" style={{ marginTop: '50px'}}>
                <h1 className="mb-4 text-center">회원가입</h1>
                <form className="row" onSubmit={handleSubmit(submitEvent, errorEvent)}>
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-12 col-xl-7 mx-auto">
                            <div className="row">
                                  <div className="form-item w-100">
                                      <label htmlFor="email" className="form-label my-3 fw-bold">아이디(이메일)  <span style={{ color: 'orange' }}>{errors.email?.message}</span><sup>*</sup></label>
                                      <input type="email" className="form-control" id="email" name="email" {...register('email', {
                                        required: { value: true, message: '이메일을 입력하시오.' },
                                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: '이메일 형식에 맞지않습니다.' },
                                      })} />
                                  </div>
                            </div>
                            <div className="form-item">
                                <label htmlFor="password" className="form-label my-3 fw-bold">비밀번호  <span style={{color: 'orange'}}>{errors.password?.message}</span><sup>*</sup></label>
                                <input type="password" className="form-control" id="password" name='password' {...register('password', {
                                    required: { value: true, message: '비밀번호를 입력하시오.'},
                                    pattern: { value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/, message: '영문, 숫자를 조합하여 6글자 이상 입력해 주세요' },
                                })} />
                            </div>
                            <div className="form-item">
                                <label htmlFor="name" className="form-label my-3 fw-bold">이름 <span style={{ color: 'orange' }}>{errors.name?.message}</span><sup>*</sup></label>
                                <input type="text" className="form-control" id="name" name="name" {...register('name', {
                                    required: { value: true, message: '이름을 입력하시오.' },
                                })} />
                            </div>
                            <div className="form-item">
                                <label htmlFor='birthday' className="form-label my-3 fw-bold">생년월일 <span style={{color: 'orange'}}>{errors.birthday?.message}</span><sup>*</sup></label>
                                <input type="date" className="form-control" id="birthday" name='birthday' {...register('birthday', {
                                    required: { value: true, message: '생년월일을 입력하시오.' },
                                })} />
                            </div>
                            <div className="form-item">
                                <label htmlFor='tel' className="form-label my-3 fw-bold">전화번호 <span style={{color: 'orange'}}>{errors.tel?.message}</span><sup>*</sup></label>
                                <input type="tel" className="form-control" id="tel" name='tel' {...register('tel', {
                                    required: { value: true, message: '전화번호를 입력하시오.' },
                                    pattern: { value: /^010-\d{4}-\d{4}$/, message: '전화번호 형식에 맞지않습니다.' },
                                })} />
                            </div>
                            <div className="form-item">
                                <label htmlFor="nickname" className="form-label my-3 fw-bold">닉네임 <span style={{ color: 'orange' }}>{errors.nickname?.message}</span><sup>*</sup></label>
                                <input type="text" className="form-control" id="nickname" name="nickname" {...register('nickname', {
                                    required: { value: true, message: '닉네임을 입력하시오.' },
                                    maxLength: { value: 10, message: '닉네임이 너무 깁니다.(10자 이하로)' }
                                })} />
                            </div>

                            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">회원가입 하기!</button>
                            </div>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>
  )
}

export default SignUp