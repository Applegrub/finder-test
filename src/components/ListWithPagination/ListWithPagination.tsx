import React from 'react';
import {Grid} from '@mui/material';
import {CategoryRequestEnum} from 'utils/constants';
import Pagination from "./Pagination";

interface Props {
  category: CategoryRequestEnum;
}

const ListWithPagination: React.FC<Props> = ({ category }) => (
    <Grid mb={3} container spacing={2}>
      <Pagination category={category} />
    </Grid>
    )

export default ListWithPagination;
