import { requestHandler } from './http';

export const getCategories = async () => {
  return await requestHandler('get', '/categories');
};
