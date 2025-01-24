import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const join = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/join`, {
      name, // 순서 변경
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

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || '로그인 실패');
    }
    throw error;
  }
};
