import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  Search: T[];
  totalResults: number;
  Response: string;
}

const axiosInstance = axios.create({
  baseURL: "http://www.omdbapi.com",
  params: {
    apikey: "d318cf92",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((response) => response.data);
  };

  get = (id: string | number) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/?i=${id}`)
      .then((response) => response.data);
  };
}

export default APIClient;
