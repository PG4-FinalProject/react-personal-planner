import { JoinData, LoginData } from '../models/user.model';
import { requestHandler } from './http';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const login = async (loginData: LoginData) => {
  return await requestHandler('post', 'users/login', loginData);
};

export const join = async (joinData: JoinData) => {
  return await requestHandler('post', 'users/join', joinData);
};
