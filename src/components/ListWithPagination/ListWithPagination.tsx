import React from 'react';
import { Grid } from '@mui/material';
import Pagination from './Pagination';
import { useAppSelector } from 'store/hooks';
import { selectorCategory } from 'store/categorySlice';

const ListWithPagination: React.FC = () => {
  const category = useAppSelector(selectorCategory);

  return (
    <Grid mb={3} container spacing={2}>
      <Pagination category={category} />
    </Grid>
  );
};

export default ListWithPagination;
