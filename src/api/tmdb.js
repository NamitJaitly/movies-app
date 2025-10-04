
import axios from 'axios';

export const API_KEY = 'd77d42fbd053144c6422801de0a76e66';
export const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export default tmdb;