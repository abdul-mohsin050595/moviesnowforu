import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";

const api_key = import.meta.env.VITE_REACT_API_KEY;

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`${url}/?api_key=${api_key}`);

      const { results: data } = await res.data;
      setLoading(false);
      setData(data);
    } catch (error) {
      const { message } = error;
      setLoading(false);
      setError(message);
    }
  }, [url]);

  useEffect(() => {
    fetchMovies();
  }, [url]);

  return { loading, data, error };
};

export default useFetch;
