import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { CategoryRequestEnum } from 'utils/constants';
import Card from 'components/Card';
import { useGetInfoQuery } from 'services/apiService/infoApi';

interface Props {
  initPage?: number;
  category: CategoryRequestEnum;
}

const Pagination: React.FC<Props> = ({ initPage = 1, category }) => {
  const [hasPagination, setHasPagination] = useState(false);
  const { data, isLoading } = useGetInfoQuery({ category, page: initPage });
  const maxPageCount = Math.ceil(Number(data?.count) / 10);

  useEffect(() => {
    setHasPagination(false);
  }, [category]);

  if (isLoading) {
    return (
      <Grid container item justifyContent='center' alignItems='center' xs={10}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      {data?.results.map((item, index) => (
        <Grid item xs key={item.name}>
          <Card category={category} character={item} id={index + 1} />
        </Grid>
      ))}
      {hasPagination && (
        <Pagination category={category} initPage={initPage + 1} />
      )}
      {!hasPagination && maxPageCount > initPage && (
        <Grid container width={1} justifyContent='center'>
          <Button onClick={() => setHasPagination((prev) => !prev)}>
            Load More...
          </Button>
        </Grid>
      )}
    </>
  );
};

export default Pagination;
