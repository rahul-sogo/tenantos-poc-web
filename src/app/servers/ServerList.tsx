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
} from '@mui/material';
import { getServers,createServer } from '../../services/apiServer';
import FloatingButton from '@/components/common/FloatingButton/page';

const ServerList: React.FC = () => {
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

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Server List
        </Typography>
        {error && <Typography color="error">Error: {error}</Typography>}
        <TextField
          label="Quick Search"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : servers.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Power</TableCell>
                  <TableCell>Servername</TableCell>
                  <TableCell>Hostname</TableCell>
                  <TableCell>Primary IP</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>OS</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Short Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servers
                  .slice((page - 1) * pageSize, page * pageSize)
                  .map((server) => (
                    <TableRow key={server.id}>
                      <TableCell>{server.cachedPowerstatus || 'N/A'}</TableCell>
                      <TableCell>{server.servername}</TableCell>
                      <TableCell>{server.hostname}</TableCell>
                      <TableCell>{server.primaryip || 'N/A'}</TableCell>
                      <TableCell>{server.owner_realname}</TableCell>
                      <TableCell>
                        {server.tags.length > 0 ? server.tags.join(', ') : 'N/A'}
                      </TableCell>
                      <TableCell>{server.os || 'N/A'}</TableCell>
                      <TableCell>{server.servertype}</TableCell>
                      <TableCell>{server.description || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <Select
                value={pageSize}
                displayEmpty
              >
                {[10, 25, 50, 100].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
              <Pagination
                count={Math.ceil(servers.length / pageSize)}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </TableContainer>
        ) : (
          <Typography>No servers available</Typography>
        )}
      </Box>
      <FloatingButton />
    </Box>
  );
};

export default ServerList;
