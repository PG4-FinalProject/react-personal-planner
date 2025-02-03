import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = 'http://localhost:9999';
const DEFAULT_TIMEOUT = 5000;

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
      Authorization: getToken() ? getToken() : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = getToken() ? getToken() : '';
    return config;
  });

  axiosInstance.interceptors.response.use(
    res => res,
    (err: AxiosError | Error) => {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const { status, data } = err.response;

          switch (status) {
            case 400:
              console.error(data);
              break;
            case 401:
              console.error(data);
              removeToken();
              window.location.href = '/users/login';
              break;
            case 404:
              console.error(data);
              break;
            case 500:
              console.error('서버 내부 에러 발생!');
              break;
            default:
              console.error('알 수 없는 에러 발생!');
          }
        } else if (err.request) {
          console.error('서버로부터 응답 없음!');
        } else {
          console.error(`에러 발생: ${err.message}`);
        }
      } else if (err instanceof Error && err.name === 'TimeoutError') {
        console.error('요청 시간 초과!');
      } else {
        console.error('알 수 없는 에러 발생!');
      }
      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

const httpClient = createClient();

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T | undefined,
) => {
  try {
    let res;

    switch (method) {
      case 'get':
        res = await httpClient.get(url, payload as AxiosRequestConfig<T>);
        break;
      case 'post':
        res = await httpClient.post(url, payload);
        break;
      case 'put':
        res = await httpClient.put(url, payload);
        break;
      case 'delete':
        res = await httpClient.delete(url);
        break;
    }
    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
