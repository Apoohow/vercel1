import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateCopy = async (eventData) => {
  try {
    const response = await api.post('/api/generate-copy', eventData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || '生成文案時發生錯誤');
  }
};

export const getLocationDetails = async (address) => {
  try {
    const response = await api.get('/api/location-details', {
      params: { address }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || '獲取地點資訊時發生錯誤');
  }
};

export const generateForm = async (eventData) => {
  try {
    const response = await api.post('/api/generate-form', eventData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || '生成表單時發生錯誤');
  }
}; 