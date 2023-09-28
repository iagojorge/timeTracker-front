
import axios, { AxiosInstance } from "axios";

const clientHttp: AxiosInstance = axios.create({
  baseURL: "https://tracker-db.vercel.app/",
});

export default clientHttp;

