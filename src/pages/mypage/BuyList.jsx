import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userState } from '@recoils/users';
import { listState } from '@recoils/list';

import SubIntroSingle from '@components/SubIntroSingle';

function BuyList() {
  const navigate = useNavigate();

  const user = useRecoilValue(userState);
  const localstorage = window.localStorage;
  const [lists, setList] = useRecoilState(listState);


  useEffect(() => {
    if (!localstorage.user && user.email === '') {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [localstorage.user, user.email, navigate]);

  const getProductList = useCallback(async () => {
    try {
      const resp = await axios.get('http://localhost:8000/sell/getBuyList', {
        params: {
          user_id: user.id,
        },
      });
  
      if (resp.status === 200) {
        setList(resp.data.data);
      } else {
        console.error('리스트 불러오기 실패');
      }
    } catch (error) {
      console.error(error);
    }
  }, [setList, user.id]);

  const handleDelete = async (productId) => {
    try {
      const resp = await axios.delete(`http://localhost:8000/sell/deleteSell/${productId}`);

      if (resp.status === 200) {
        getProductList();
      } else {
        console.error('리스트 삭제 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  return (
    <main id="main">
        <div className="container-fluid page-header py-5" style={{ marginBottom: '50px'}}>
            <h1 className="text-center text-white display-6">My page</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item active text-white">Buy</li>
                <li className="breadcrumb-item"><a href="/sellList">Sell</a></li>
            </ol>
        </div>

      <SubIntroSingle title="구매 목록" pathName="Buy"></SubIntroSingle>

        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="table-responsive">
                {lists && lists.length > 0 ? (
                    <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Products</th>
                            <th scope="col">상품명</th>
                            <th scope="col">구매가</th>
                            <th scope="col">바코드번호</th>
                            <th scope="col">할인율</th>
                            <th scope="col">유효기간</th>
                            <th scope="col">삭제</th>
                          </tr>
                        </thead>
                        <tbody>
                        {lists?.map(item => (
                            <tr key={item.product_id}>
                                <th scope="row">
                                    <div className="d-flex align-items-center">
                                        <img key={item.imageName} src={item.imageName} className="img-fluid me-5 rounded-circle" style={{width: '80px', height: '80px'}} alt="" />
                                    </div>
                                </th>
                                <td><p className="mb-0 mt-4">{item.name}</p></td>
                                <td><p className="mb-0 mt-4">{item.sale_price} P</p></td>
                                <td>
                                    <div className="input-group quantity mt-4" style={{ width: '100px'}}>
                                        <div className="input-group-btn" >
                                    <p style={{ width: '250px' }}>{item.barcode}</p>                            
                                        </div>
                                    </div>
                                </td>
                                <td><p className="mb-0 mt-4">{item.sale}%</p></td>
                                <td><p className="mb-0 mt-4">{item.ex_date}</p></td>
                                <td>
                                  <button onClick={() => handleDelete(item.product_id)} className="btn btn-light" style={{marginTop: '17px'}}>❌</button>
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
export default BuyList;

BuyList.defaultProps = {
  sub: ''
};