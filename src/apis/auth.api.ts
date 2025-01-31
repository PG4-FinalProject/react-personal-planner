import { LoginData } from '../models/user.model';
import { requestHandler } from './http';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const login = async (loginData: LoginData) => {
  return await requestHandler('post', 'users/login', loginData);
};

// 프론트엔드 auth.ts 수정
export const join = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/join`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || '회원가입 실패');
    }
    throw error;
  }
};

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await axios.post(`${API_URL}/users/login`, {
//       email,
//       password,
//     });

//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//     }
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data.message || '로그인 실패');
//     }
//     throw error;
//   }
// };
