import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const reportOutage = (data) => API.post('/outages', data);
export const fetchOutages = () => API.get('/outages');
export const fetchWeather = (lat, lon) => API.get(`/outages/weather?lat=${lat}&lon=${lon}`);
