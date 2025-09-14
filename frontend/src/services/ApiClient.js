import axios from "axios";
import { refreshService } from "./UserServices";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          console.error("No se encontró el token de refresco.");
          throw new Error("Token de refresco no encontrado.");
        }

        // Renueva el token de acceso
        const response = await refreshService({ refresh: refreshToken });
        const newAccessToken = response.access;

        // Guarda el nuevo token de acceso
        localStorage.setItem("access_token", newAccessToken);

        // Reintenta la solicitud original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("No se pudo refrescar el token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
