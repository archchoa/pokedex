import axios from "axios";
import { API_URL } from "@/config";

const client = axios.create({ baseURL: API_URL });

export const request = ({ ...options }) => {
  client.defaults.headers.common["Content-Type"] = "application/json";
  client.defaults.headers.common["Accept"] = "application/json";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (response: any) => response;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    if (error.response.status === 401) {
    }

    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};
