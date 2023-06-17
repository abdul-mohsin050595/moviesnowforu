import axios from "axios";

const authorization = import.meta.VITE_REACT_ACCESS_TOKEN;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${authorization}`,
    accept: "application/json",
  },
});
export default api;
