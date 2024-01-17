import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist({
  key: 'product',
  storage: localStorage,
});

export const productState = atom({
  key: 'product/productState',
  default: {
    product_id: '',
    name: '',
    cost_price: '',
    sale_price: '',
    ex_date: '',
    barcode: '',
    info: '',
    sale: '',
    imageName: '',
    imagePath: '',
    user_id: '',
  },
  effects: [persistAtom],
});
