import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
            <div className="container py-5">
                <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
                    <div className="row g-4">
                        <div className="col-lg-3">
                            <Link href="#">
                                <h1 className="text-primary mb-0">CarrotCon</h1>
                            </Link>
                        </div>
                
                        <div className="col-lg-6">
                            <div className="d-flex justify-content-end pt-3">
                                <Link className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-twitter"></i></Link>
                                <Link className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-facebook-f"></i></Link>
                                <Link className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-youtube"></i></Link>
                                <Link className="btn btn-outline-secondary btn-md-square rounded-circle" href=""><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">다양한 기프티콘을 구매해보세요!</h4>
                            <p className="mb-4">저희 CarrotCon에서는 사용하지않는 기프티콘은 판매하고 
                            필요한 기프티콘은 저렴하게 구매할 수 있습니다.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">연락처</h4>
                            <p>Email: hongildong123@naver.com</p>
                            <p>Phone: +0123 4567 8910</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer