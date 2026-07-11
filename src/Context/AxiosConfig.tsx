import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://54.169.37.43:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isRefreshing = false;
type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

AxiosConfig.interceptors.request.use(
  (config) => {
    const accessToken =
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

AxiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return AxiosConfig(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = sessionStorage.getItem("refreshToken");
      const fallbackRefreshToken = localStorage.getItem("refreshToken");
      const effectiveRefreshToken = refreshToken || fallbackRefreshToken;

      if (!effectiveRefreshToken) {
        window.location.href = "/admin-login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://54.169.37.43:3000"}/auth/refresh?refreshToken=${effectiveRefreshToken}`,
        );

        const newAccessToken = response.data.accessToken;
        sessionStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        AxiosConfig.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        return AxiosConfig(originalRequest);
      } catch (err) {
        processQueue(err, null);
        sessionStorage.clear();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/admin-login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default AxiosConfig;
