import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AUTH_KEY = process.env.NEXT_PUBLIC_AUTH_KEY;

export const getRemoteAgents = async () => {
  const response = await axios.get(`${BASE_URL}/api/remoteAgents`, {
    headers: {
      'Authorization': `Bearer ${AUTH_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return response.data;
};

export const testConnectivity = async (agentId: string) => {
  const response = await axios.post(`${BASE_URL}/api/remoteAgents/${agentId}/actions/testConnectivity`, {}, {
    headers: {
      'Authorization': `Bearer ${AUTH_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return response.data;
};

export const getIpmiKvmIsos = async () => {
  const response = await axios.get(`${BASE_URL}/api/remoteAgents/ipmiKvmIsos`, {
    headers: {
      'Authorization': `Bearer ${AUTH_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return response.data;
};