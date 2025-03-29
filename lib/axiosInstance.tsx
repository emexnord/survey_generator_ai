import { auth } from "@/auth";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

api.interceptors.request.use(
  async (config) => {
    // if (config.url?.includes("/api/survey")) {
    //   const session = await auth();

    //   if (session?.accessToken) {
    //     config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    //   }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(`api/user/refresh`, {
          withCredentials: true,
        });
        console.log("res", res);
        const newAccessToken = res.data.accessToken;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
