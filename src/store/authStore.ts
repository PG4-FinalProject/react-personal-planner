import { create } from 'zustand';

interface StoreState {
  isLogin: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const useAuthStore = create<StoreState>(set => ({
  isLogin: getToken() ? true : false,
  storeLogin: (token: string) => {
    set({ isLogin: true });
    setToken(token);
  },
  storeLogout: () => {
    set({ isLogin: false });
    removeToken();
  },
}));
