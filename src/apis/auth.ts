import axios, { AxiosError } from 'axios';

interface AuthResponse {
  token: string;
  message: string;
}

interface ErrorResponse {
  message: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>('/api/users/login', {
      email,
      password,
    });

    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(
      axiosError.response?.data.message || '로그인에 실패했습니다.',
    );
  }
};

export const join = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>('/api/users/join', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(
      axiosError.response?.data.message || '회원가입에 실패했습니다.',
    );
  }
};
