import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api/', // Reemplaza 'URL_GENERAL_DE_LA_API' por la URL base de tu API
});

export default api;
