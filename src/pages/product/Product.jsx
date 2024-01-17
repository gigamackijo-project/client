import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { productState } from '@recoils/product';
import axios from 'axios';
import HeartIcon from '@components/product/HeartIcon';

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useRecoilState(productState);
  const [sortBy, setSortBy] = useState('created_at');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await axios.get('http://localhost:8000/product/getProductList', {
          params: {
            sort: sortBy,
          },
        });
        setProducts(resp.data);
      } catch (error) {
        console.error('상품 목록을 불러오는데 실패했습니다.', error);
      }
    };

    fetchProducts();
  }, [setProducts, sortBy]);

  const handleButtonClick = () => {
    navigate('/sellpage');
  };

  const sortProducts = (products, order) => {
    return products?.resp?.slice().sort((a, b) => {
      if (order === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (order === 'created_at') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (order === 'sale') {
        return b.sale - a.sale;
      }
      return 0;
    });
  };

    const [search, setSearch] = useState('');
    const handleSearchInputChange = (event) => {
        setSearch(event.target.value);
     };

  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div>
      <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Shop</h1>
        <ol class="breadcrumb justify-content-center mb-0">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active text-white">Shop</li>
          <li class="breadcrumb-item"><Link to="#">Sell</Link></li>
        </ol>
      </div>
      <div class="container-fluid fruite py-5">
        <div class="container py-5">
          <h1 class="mb-4">Gift shop</h1>
          <div class="row g-4">
            <div class="col-lg-12">
              <div class="row g-4">
                <div class="col-xl-3">
                  <button
                    type="button"
                    className="btn border-secondary py-3 px-4 text-uppercase w-100"
                    style={{ borderWidth: '2px', marginBottom: '30px', borderColor: 'green' }}
                    onClick={handleButtonClick} 
                    >
                    상품 등록
                  </button>
                </div>
                <div class="col-6">
                  <div class="input-group w-100 mx-auto d-flex">
                    <input
                      type="search"
                      class="form-control p-3"
                      placeholder="찾으시는 상품명을 입력해주세요!"
                      value={search}
                      onChange={handleSearchInputChange}
                      aria-describedby="search-icon-1"
                    />
                    <span id="search-icon-1" class="input-group-text p-3">
                      <i class="fa fa-search"></i>
                    </span>
                  </div>
                </div>
                <div class="col-xl-3">
                  <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label for="fruits">Default Sorting:</label>
                    <select
                      id="fruits"
                      name="fruitlist"
                      class="border-0 form-select-sm bg-light me-3"
                      form="fruitform"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="created_at">최신순</option>
                      <option value="basic">등록순</option>
                      <option value="sale">할인순</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row g-4">
                <div class="col-lg-3">
                  <div class="row g-4">
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <h4>가격대별</h4>
                        <ul class="list-unstyled fruite-categorie">
                          <li>
                            <div class="d-flex justify-content-between fruite-name">
                              <Link to="#">
                                <i class="fas fa-apple-alt me-2"></i>10,000 Point
                              </Link>
                              <span>(3)</span>
                            </div>
                          </li>
                          <li>
                            <div class="d-flex justify-content-between fruite-name">
                              <Link to="#">
                                <i class="fas fa-apple-alt me-2"></i>20,000 Point
                              </Link>
                              <span>(5)</span>
                            </div>
                          </li>
                          <li>
                            <div class="d-flex justify-content-between fruite-name">
                              <Link to="#">
                                <i class="fas fa-apple-alt me-2"></i>30,000 Point
                              </Link>
                              <span>(2)</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h4 className="mb-3">최근 본 상품</h4>
                      <div className="d-flex align-items-center justify-content-heartt">
                          <div className="rounded me-4" style={{width: '100px', height: '100px'}}>
                              <img src="img/best3.jpg" className="img-fluid rounded" alt="" />
                          </div>
                          <div>
                              <h6 className="mb-2">스타벅스</h6>
                              <div className="d-flex mb-2">
                               <HeartIcon />
                              </div>
                              <div className="d-flex mb-2">
                                  <h5 className="fw-bold me-2">8,000원</h5>
                                  <h5 className="text-danger text-decoration-line-through">12,000원</h5>
                              </div>
                          </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-heartt">
                          <div className="rounded me-4" style={{width: '100px', height: '100px'}}>
                              <img src="img/best6.jpg" className="img-fluid rounded" alt="" />
                          </div>
                          <div>
                              <h6 className="mb-2">기프트카드 1만원권</h6>
                              <div className="d-flex mb-2">
                                    <HeartIcon />
                              </div>
                              <div className="d-flex mb-2">
                                  <h5 className="fw-bold me-2">7,000원</h5>
                                  <h5 className="text-danger text-decoration-line-through">10,000원</h5>
                              </div>
                          </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-heartt">
                          <div className="rounded me-4" style={{width: '100px', height: '100px'}}>
                              <img src="img/best2-1.jpg" className="img-fluid rounded" alt="" />
                          </div>
                          <div>
                              <h6 className="mb-2">신세계상품권</h6>
                              <div className="d-flex mb-2">
                                  <HeartIcon />
                              </div>
                              <div className="d-flex mb-2">
                                  <h5 className="fw-bold me-2">8,000원</h5>
                                  <h5 className="text-danger text-decoration-line-through">10,000원</h5>
                              </div>
                          </div>
                      </div>                                   
                  </div>
              </div>
          </div>
      <div className="col-lg-9">
        <div>
          <div className="row g-4 justify-content-center">
            {sortedProducts
              ?.filter((product) => product.state === '판매중')
              ?.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
              .map((product) => (
                <div key={product.product_id} className="col-md-6 col-lg-6 col-xl-4">
                  <div className="rounded position-relative fruite-item">
                    <div className=" border border-lightgray">
                      <img
                        key={product.product_id}
                        src={product.imageName}
                        alt={product.name}
                        style={{ width: '300px', height: '250px', objectFit: 'cover' }}                                className="img-fluid w-100 rounded-top"
                      />
                    <div
                      className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                      style={{ top: '10px', left: '10px', marginLeft: '70%' }}>
                        {product.sale}%
                    </div>
                    </div>
                    <div className="p-4 border border-lightgray rounded-bottom">
                      <h5>{product.name}</h5>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold" style={{ marginTop: '5px' }}>{`${product.sale_price}`} P</p>
                        <Link
                          to={`/productDetail/${product.product_id}`}
                          className="btn border border-secondary px-3 mt-3"
                          style={{ marginTop: '1px' }}>
                          <i className="me-2"></i>상세 보기
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
                <div class="col-12">
                  <div class="pagination d-flex justify-content-center mt-5">
                    <Link to="#" class="rounded">
                      &laquo;
                    </Link>
                    <Link to="#" class="active rounded">
                      1
                    </Link>
                    <Link to="#" class="rounded">
                      2
                    </Link>
                    <Link to="#" class="rounded">
                      3
                    </Link>
                    <Link to="#" class="rounded">
                      4
                    </Link>
                    <Link to="#" class="rounded">
                      5
                    </Link>
                    <Link to="#" class="rounded">
                      &raquo;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
