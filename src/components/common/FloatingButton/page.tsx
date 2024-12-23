'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import AddServerPopup from '@/app/home/AddServerPopup/page';

const FloatingButton: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (route: string) => {
    router.push(route);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {showOptions && (
        <Box mb={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ mb: 1 }}
            onClick={() => handleOptionClick('/add-dedicated')}
          >
            + Dedicated
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOptionClick('/add-vps')}
          >
            + VPS
          </Button>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '50%',
          width: 56,
          height: 56,
          minWidth: 0,
        }}
        onClick={toggleOptions}
      >
        {showOptions ? '✕' : '+'}
      </Button>
    </Box>
  );
};

export default FloatingButton;
