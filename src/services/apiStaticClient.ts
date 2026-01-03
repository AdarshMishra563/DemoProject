import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { AxiosErrorMessage, BASE_URL_V2 } from '../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';
import { logout } from '@redux/slice/authSlice';
import { store } from '@redux/store';
import { resetAndNavigate } from '@utils/NavigationUtil';

// Create an Axios instance
const apiStaticClient: AxiosInstance = axios.create({
  baseURL: BASE_URL_V2,
  timeout: 10000, // Timeout in milliseconds
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Helper function to show Toast messages
const showToast = (message: string) => {
  Toast.error(message);
};

// Helper function to handle logout on 401
const handleUnauthorized = async () => {
  await AsyncStorage.clear();
  store.dispatch(logout());
  resetAndNavigate('Login');
  showToast('Session expired. Please log in again.');
};

// Request interceptor
apiStaticClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization =
      'uOddiZliFen9pZyBMLBaGZhhXG2J3ENpeB6HOovzvhQ';
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor
apiStaticClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: Error | AxiosError<AxiosErrorMessage>) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      switch (status) {
        case 401:
          await handleUnauthorized();
          // Handle token expiration or redirect to login if necessary
          break;
        case 403:
        case 404:
          // showToast('Something Went Wrong');
          break;
        case 500:
          showToast('Internal Server Error. Please Try Again!');
          break;
        default:
        // showToast('Something Went Wrong!');
      }
    }
    // else {
    //   showToast('Something Went Wrong!');
    // }
    return Promise.reject(error || 'Something Went Wrong');
  },
);

export default apiStaticClient;
