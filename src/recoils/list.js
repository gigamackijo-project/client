import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist({
  key: 'list',
  storage: localStorage,
});

export const listState = atom({
  key: 'list/listState',
  default: {
    name:'',
    imageName: '',
    imagePath: '',
    cost_price: '',
    sale_price: '',
    barcode: '',
    ex_date: '',
  },
  effects: [persistAtom],
});
