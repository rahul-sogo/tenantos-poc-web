'use client';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import { sessionStorageSet } from '@/utils';

/**
 * Renders login form for user to authenticate
 * @component LoginForm
 */
const LoginForm = () => {
  const router = useRouter();
  const [, dispatch] = useAppStore();

  // Hardcoded username and password
  const validCredentials = {
    username: 'Pattabi',
    password: 'xmU5Sks*82xG2PBV',
  };

  // State to hold input values
  const [input, setInput] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const isButtonDisabled = !input.username || !input.password;

  // Handle input change
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle login
  const handleLogin = () => {
    if (
      input.username === validCredentials.username &&
      input.password === validCredentials.password
    ) {
      // Save access token to session storage
      sessionStorageSet('access_token', 'TODO:_save-real-access-token-here');

      // Dispatch login action
      dispatch({ type: 'LOG_IN' });

      // Redirect to the same page
      router.replace('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#F5F6FA"
    >
      <Box
        width={400}
        bgcolor="white"
        boxShadow={3}
        borderRadius={2}
        p={4}
        textAlign="center"
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          RedSwitches Metal Portal
        </Typography>
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            label="Email / Username"
            name="username"
            value={input.username}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            disableElevation
            disabled={isButtonDisabled}
            sx={{
              textTransform: 'none',
              py: 1.2,
            }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginForm;
