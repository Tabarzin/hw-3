import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = () => {
  return axios.get(`${API_BASE_URL}/products`);
};
