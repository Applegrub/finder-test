import React from 'react';
import {Box, Container} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout: React.FC = () => {
  return (
    <Box minWidth={1} minHeight={1} bgcolor='#f7f7f7' position='absolute'>
      <Header />
        <Container>
            <Outlet />
        </Container>
    </Box>
  );
};

export default Layout;
