import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { pinia } from "@/main"; // เอา pinia instance ที่ mount แล้วมาใช้

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const userStore = useUserStore(pinia);

    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "Invalid token"
    ) {
      // ✅ แจ้งเตือนผู้ใช้
      alert("เซสชันหมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่");

      userStore.logout();
      localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
