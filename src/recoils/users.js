import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist({
  key: 'user',
  storage: localStorage,
});

export const userState = atom({
  key: 'users/userState',
  default: {
    user_id: '',
    name: '',
    nickname: '',
    email: '',
    password: '',
    updated_at: '',
    point: '',
    birthday: '',
    tel: '',
  },
  effects: [persistAtom],
});
