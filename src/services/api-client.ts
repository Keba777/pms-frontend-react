import axios, { AxiosHeaders } from "axios";
import { useAuthStore } from "@/store/authStore";

const getClientToken = () => {
    const { token } = useAuthStore.getState();
    return token;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getClientToken();

        if (config.url && !config.url.includes("/auth/") && token) {
            // Ensure headers is an AxiosHeaders instance (type-safe) then set Authorization
            if (config.headers instanceof AxiosHeaders) {
                config.headers.set("Authorization", `Bearer ${token}`);
            } else {
                // create a new AxiosHeaders from whatever headers exist (safe cast)
                config.headers = new AxiosHeaders({
                    ...(config.headers as Record<string, unknown>),
                    Authorization: `Bearer ${token}`,
                });
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
