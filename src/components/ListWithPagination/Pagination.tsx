import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { CategoryRequestEnum } from 'utils/constants';
import Card from 'components/Card';
import { InfoResponse } from 'services/ResponseTypes';
import { getInfoRequest } from 'services/getInfoRequest';

interface Props {
  initPage?: number;
  category: CategoryRequestEnum;
}

const Pagination: React.FC<Props> = ({ initPage = 1, category }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPagination, setHasPagination] = useState(false);
  const [info, setInfo] = useState<InfoResponse | undefined>();
  const [maxPageCount, setMaxPageCount] = useState(0);

  useEffect(() => {
    setHasPagination(false);
    getInfoRequest({
      category,
      initPage,
      onComplete: (res) => {
        setMaxPageCount(Math.ceil(Number(res.count) / 10));
        setInfo(res);
        setIsLoading(false);
      },
    });
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
      {info?.results.map((item, index) => (
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
