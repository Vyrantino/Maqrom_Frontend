import * as React from 'react';
import { Box, Paper } from '@mui/material';





export default function Papers() {

  return (
    <Box
        sx={{
          height: 150,
          width: '100%',
          p: 1,
          my: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
    >
          <Paper sx={ { backgroundColor: 'blue' } } />
    </Box>
  );
}