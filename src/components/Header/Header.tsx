import React from 'react';
import { Box, Divider } from '@mui/material';

const Header = () => {
  return (
    <Box bgcolor='#333' color='white' mb={2} width={1} textAlign='center'>
      <Box py={2}>COOL HEADER</Box>
      <Divider />
    </Box>
  );
};

export default Header;
