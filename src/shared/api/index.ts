import axios from "axios";
import { useUserStore } from "@/entities/user/model/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers['x-access-token'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);