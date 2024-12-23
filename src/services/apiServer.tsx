import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AUTH_KEY = process.env.NEXT_PUBLIC_AUTH_KEY;


const apiServer = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${AUTH_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
//   timeout: 1000, 
});

/**
 * @returns {Promise<any>} 
 */
export const getServers = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get('/api/servers');
    console.log('Servers:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('Error fetching servers:', error.message);
    //rethrow or handle the error for the calling component
    throw new Error(
      error.response?.data?.message || 'Error fetching servers'
    );
  }
};

export default apiServer;
