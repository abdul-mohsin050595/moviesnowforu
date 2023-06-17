import api from "../utils/api";
const api_key = import.meta.env.VITE_REACT_API_KEY;

const searchMedia = async (mediaType, query, page = 1) => {
  return await api.get(
    `/search/${mediaType}?query=${query}&api_key=${api_key}&include_adult=false&language=en-US&page=${page}`
  );
};

const apiConfigs = {
  searchMedia,
};

export default apiConfigs;
