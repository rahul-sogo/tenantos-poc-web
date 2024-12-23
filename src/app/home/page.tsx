'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import { getServers } from '../../services/apiServer';
import FloatingButton from '@/components/common/FloatingButton/page';

const Home: React.FC = () => {
  const [servers, setServers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(50);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);
      try {
        const response = await getServers();
        console.log('API Response:', response);

        if (response?.result && Array.isArray(response.result)) {
          setServers(response.result);
        } else {
          setServers([]);
          setError('Unexpected response format from the server');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPageSize(event.target.value as number);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Server List
      </Typography>
      
    </Box>
  );
};

export default Home;
