import axios from "axios";
export const backendaxios = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})