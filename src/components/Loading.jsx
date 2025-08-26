

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      gap: 1,
      opacity: 0.6
    }}>
      Carregando <CircularProgress sx={{ width: '20px !important', height: '20px !important' }} />
    </Box>
  );
}