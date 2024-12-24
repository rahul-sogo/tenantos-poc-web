import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AUTH_KEY = process.env.NEXT_PUBLIC_AUTH_KEY;

const apiUser = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${AUTH_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getAllUsers = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiUser.get('/api/users');
    return response.data;
  } catch (error: any) {
    console.error('Error details:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Error fetching servers');
  }
};

export const getCurrentUsers = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiUser.get('/api/user');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching servers');
  }
};
