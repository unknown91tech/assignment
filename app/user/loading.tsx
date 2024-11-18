// components/Loading.tsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <CircularProgress size={50} color="primary" />
      <Typography variant="h6" color="textSecondary" marginTop={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
