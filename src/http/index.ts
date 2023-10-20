
import axios, { AxiosInstance } from "axios";

const clientHttp: AxiosInstance = axios.create({
  baseURL: "https://time-tracker-api-test.onrender.com/",
});

export default clientHttp;

