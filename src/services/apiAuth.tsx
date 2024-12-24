import axios, { AxiosResponse } from 'axios';
 
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AUTH_KEY = process.env.NEXT_PUBLIC_AUTH_KEY;
 
const apiSystem = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${AUTH_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
 
export const getSettingsAfterLogin = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiSystem.get('/api/system/settingsAfterLogin');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching settings');
  }
};
 
export const getUiSettings = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiSystem.get('/api/system/ui/settings');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching UI settings');
  }
};
 
export const getUiLanguage = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiSystem.get('/api/system/ui/uiLanguage');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching UI language');
  }
};
 
export const getVersion = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiSystem.get('/api/system/ui/version');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching version');
  }
};
 
export const getActivityLog = async (serverId: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiSystem.get(`/api/servers/${serverId}/activitylog`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching activity log');
  }
};