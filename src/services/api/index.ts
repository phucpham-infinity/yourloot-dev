import { axiosInstance } from './config/axios-config';
import { setupAuthInterceptor } from './interceptors/auth.interceptor';
import { setupErrorInterceptor } from './interceptors/error.interceptor';


// Setup interceptors
setupAuthInterceptor(axiosInstance);
setupErrorInterceptor(axiosInstance);

export { axiosInstance as httpClient };
export { API_ENDPOINTS } from './config/endpoints';