import { JoinReqBody, LoginReqBody } from '../types/user.type';
import { requestHandler } from './http';

export const login = async (loginData: LoginReqBody) => {
  return await requestHandler('post', 'users/login', loginData);
};

export const join = async (joinData: JoinReqBody) => {
  return await requestHandler('post', 'users/join', joinData);
};
