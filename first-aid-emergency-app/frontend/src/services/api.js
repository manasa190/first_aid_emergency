import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeEmergency = async (description) => {
  try {
    const response = await api.post('/analyze-emergency', { description });
    return response.data;
  } catch (error) {
    console.error('Error analyzing emergency:', error);
    throw error;
  }
};

export const analyzeSymptoms = async (symptoms) => {
  try {
    const response = await api.post('/analyze-symptoms', { symptoms });
    return response.data;
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw error;
  }
};

export const getNearbyHospitals = async (latitude, longitude) => {
  try {
    const response = await api.get('/nearby-hospitals', {
      params: { latitude, longitude },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    throw error;
  }
};

export const shareLocation = async (locationData) => {
  try {
    const response = await api.post('/share-location', locationData);
    return response.data;
  } catch (error) {
    console.error('Error sharing location:', error);
    throw error;
  }
};

export default api; 