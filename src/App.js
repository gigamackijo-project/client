import {Route, Routes} from 'react-router-dom';

import Layout from '@components/Layout';
import Home from '@pages/Home';
import Signup from '@pages/user/Signup';
import Login from '@pages/user/Login';
import Product from '@pages/product/Product';
import Sellpage from '@pages/product/Sellpage';
import ProductDetail from '@pages/product/ProductDetail';
import Logout from '@pages/user/Logout';
import Profile from '@pages/mypage/Profile';
import SellList from '@pages/mypage/SellList';
import BuyList from '@pages/mypage/BuyList';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/product" element={<Product />} />
        <Route path="/sellpage" element={<Sellpage />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/sellList" element={<SellList />} />
        <Route path="/buyList" element={<BuyList />} />
      </Route>
    </Routes>
  );
}

export default App;
