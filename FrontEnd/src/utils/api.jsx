import axios from 'axios';

const api = axios.create({
  baseURL: 'https://identidicationcerv.onrender.com/api/', // Reemplaza 'URL_GENERAL_DE_LA_API' por la URL base de tu API
});

export default api;
