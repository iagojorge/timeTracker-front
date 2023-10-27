import axios, { AxiosInstance } from "axios";

const clientHttp: AxiosInstance = axios.create({
  baseURL: "https://time-tracker-dev-api.onrender.com/",
});

export default clientHttp;
