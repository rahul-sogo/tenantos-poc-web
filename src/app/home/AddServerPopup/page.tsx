'use client';
import React from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';

const AddServerPopup: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Server
        </Typography>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <TextField label="Hostname" fullWidth />
          <TextField label="Servername" fullWidth />
          <Select fullWidth defaultValue="">
            <MenuItem value="">Assigned User</MenuItem>
            <MenuItem value="Pattabi">Pattabi (Pattabi)</MenuItem>
          </Select>
          <TextField label="Tags (Optional)" fullWidth />
          <Select fullWidth defaultValue="Auto">
            <MenuItem value="Auto">Auto</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
          </Select>
          <TextField label="Remote Agent" fullWidth />
          <TextField label="IPMI IP / Hostname" fullWidth />
          <TextField label="IPMI User" fullWidth />
          <TextField label="IPMI Password" fullWidth />
          <TextField label="PXE MAC" fullWidth />
        </Box>
        <Box mt={2}>
          <FormControlLabel control={<Switch />} label="Enable PXE Provisioning" />
          <FormControlLabel control={<Switch />} label="Enable IPMI Power Management" />
          <FormControlLabel control={<Switch />} label="Redirect to server configuration after creation" />
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" color="primary">
            Add Server
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddServerPopup;
