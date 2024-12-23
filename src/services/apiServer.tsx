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
});

export const getServers = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get('/api/servers');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching servers');
  }
};

export const getServerById = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get(`/api/servers/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching server');
  }
};

export const createServer = async (serverData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.post('/api/servers', serverData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error creating server');
  }
};

export const updateServer = async (id: string, serverData: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.put(`/api/servers/${id}`, serverData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error updating server');
  }
};

export const deleteServer = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.delete(`/api/servers/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error deleting server');
  }
};

export const getIpAssignments = async (serverId: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get(`/api/servers/${serverId}/ipassignments`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching IP assignments');
  }
};

export const getAssignableSubnets = async (serverId: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get(
      `/api/servers/${serverId}/ipassignments/getAssignableSubnets`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Error fetching assignable subnets'
    );
  }
};

export const getInventory = async (serverId: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get(`/api/servers/${serverId}/inventory`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching inventory');
  }
};

export const getComments = async (serverId: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get(`/api/servers/${serverId}/comments`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching comments');
  }
};

export const getActivityLog = async (serverId: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get(`/api/servers/${serverId}/activitylog`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching activity log');
  }
};

export const getTags = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get('/api/servers/tags');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching tags');
  }
};

export const getConnections = async (serverId: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get(`/api/servers/${serverId}/connections`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching connections');
  }
};

export const getHwSummary = async (serverId: string): Promise<any> => {
  try {
    const response: AxiosResponse = await apiServer.get(`/api/servers/${serverId}/hwsummary`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching hardware summary');
  }
};

export default apiServer;
