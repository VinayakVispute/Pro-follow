// useApiClient.ts
import { useAuth } from "@clerk/clerk-react";
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";

export function useApiClient(): AxiosInstance {
  const { getToken } = useAuth();

  // useMemo ensures we don't recreate the instance on every render
  const client = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    });

    // Attach an interceptor that fetches the token each time
    instance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, [getToken]);

  return client;
}
