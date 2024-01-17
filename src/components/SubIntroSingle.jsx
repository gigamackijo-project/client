import React from 'react'
import { Link } from 'react-router-dom'

function SubIntroSingle(props) {
  const { title, sub, pathName } = props;

  return (
    <section className="intro-single">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <div className="title-single-box">
              <h1 className="title-single">{title}</h1>
              <span className="color-text-a">{sub}</span>
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="#">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {pathName}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubIntroSingle