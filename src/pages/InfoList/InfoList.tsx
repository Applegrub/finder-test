import React from 'react';
import { Box, Grid } from '@mui/material';
import ListWithPagination from 'components/ListWithPagination';
import SearchBar from 'components/SearchBar';
import CategoriesBar from 'components/CategoriesBar';

const InfoList: React.FC = () => {
  return (
    <Grid container justifyContent='center'>
      <Box width={1} maxWidth='600px'>
        <SearchBar />
        <CategoriesBar />
      </Box>
      <ListWithPagination />
    </Grid>
  );
};

export default InfoList;
