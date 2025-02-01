import { JoinData, LoginData } from '../types/user.type';
import { requestHandler } from './http';

export const login = async (loginData: LoginData) => {
  return await requestHandler('post', 'users/login', loginData);
};

export const join = async (joinData: JoinData) => {
  return await requestHandler('post', 'users/join', joinData);
};
