import axios from "axios";
import { QueryClient } from "react-query";
import Cookies from 'js-cookie';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  headers: {
    "Accept":  "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config:any) => {
    const isPublicApi = window.localStorage.getItem("authToken")
    console.log(isPublicApi)
    if (isPublicApi) {
      config.headers["Authorization"] = `Bearer ${isPublicApi}`;
    }
    // if (config.params) {
    //   config.paramsSerializer = function(params) {
    //     return qs.stringify(params, { encodeValuesOnly: true })
    //   }
    // }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default api;
