import React from 'react';
import { Box } from '@mui/material';
import ListWithPagination from 'components/ListWithPagination';
import SearchBar from 'components/SearchBar';
import CategoriesBar from 'components/CategoriesBar';

const InfoList: React.FC = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box width={1} maxWidth='500px'>
        <SearchBar />
        <CategoriesBar />
      </Box>
      <ListWithPagination />
    </Box>
  );
};

export default InfoList;
