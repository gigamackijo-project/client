import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { productState } from '@recoils/product';
import { userState } from '@recoils/users';

import SubIntroSingle from '@components/SubIntroSingle';
import axios from 'axios';

function SellList() {
  const navigate = useNavigate();

  const user = useRecoilValue(userState);
  const localstorage = window.localStorage;
  const [products, setProducts] = useRecoilState(productState);

  useEffect(() => {
    if (!localstorage.user && user.email === '') {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [localstorage.user, user.email, navigate]);

  const getProductList = useCallback(async () => {
    try {
      const resp = await axios.get('http://localhost:8000/product/getProductList');
      setProducts(resp.data);
    } catch (error) {
      console.error('상품 목록을 불러오는 데 실패했습니다.', error);
    }
  },[setProducts]);

  const handleDelete = async (productId) => {
    try {
      const resp = await axios.delete(`http://localhost:8000/product/deleteProduct/${productId}`);
      if (resp.status === 200) {
        console.log(resp);
        getProductList();
      } else {
        console.error('리스트 삭제 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <main id="main">
        <div className="container-fluid page-header py-5" style={{ marginBottom: '50px'}}>
            <h1 className="text-center text-white display-6">My page</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><a href="/buyList">buy</a></li>
                <li className="breadcrumb-item active text-white">Sell</li>

            </ol>
        </div>

      <SubIntroSingle title="판매 목록" pathName="Sell"></SubIntroSingle>

        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="table-responsive">
                {products.resp && products.resp.length > 0 ? (
                    <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Products</th>
                            <th scope="col">상품명</th>
                            <th scope="col">원가</th>
                            <th scope="col">판매가</th>
                            <th scope="col">바코드번호</th>
                            <th scope="col">판매상태</th>
                            <th scope="col">삭제</th>
                          </tr>
                        </thead>
                        <tbody>
                        {products?.resp
                                ?.filter((product) => product.user_id === user.id).map((product) => (
                            <tr key={product.product_id}>
                                <th scope="row">
                                    <div className="d-flex align-items-center">
                                        <img key={product.imageName} src={product.imageName} className="img-fluid me-5 rounded-circle" style={{width: '80px', height: '80px'}} alt="" />
                                    </div>
                                </th>
                                <td><p className="mb-0 mt-4">{product.name}</p></td>
                                <td><p className="mb-0 mt-4">{product.cost_price} P</p></td>
                                <td><p className="mb-0 mt-4">{product.sale_price} P</p></td>
                                <td>
                                    <div className="input-group quantity mt-4" style={{ width: '100px'}}>
                                        <div className="input-group-btn" >
                                    <p style={{ width: '250px' }}>{product.barcode}</p>                            
                                        </div>
                                    </div>
                                </td>
                                <td><p className="mb-0 mt-4" style={{ fontWeight: 'bold' }}>{product.state}</p></td>
                                <td>
                                  <button onClick={() => handleDelete(product.product_id)} className="btn btn-light" style={{ marginTop: '17px' }}>❌</button>
                                </td>
                            </tr>
                             ))}
                        </tbody>
                    </table>
                    ) : (
                        <p>현재 아무 상품이 없습니다.</p>
                      )}
                </div>
                </div>
                </div>
    </main>

  )
}
export default SellList;

SellList.defaultProps = {
  sub: ''
};