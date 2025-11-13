import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { environments } from '@/environments';

export const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: environments.apiConfig.uri,
    timeout: environments.apiConfig.timeout,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config
  };

  const instance = axios.create(axiosConfig);
  return instance;
};

export const axiosInstance = createAxiosInstance();