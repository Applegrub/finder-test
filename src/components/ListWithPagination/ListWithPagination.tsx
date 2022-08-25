import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { CategoryRequestEnum } from 'utils/constants';
import Card from 'components/Card';
import { InfoResponse } from 'services/ResponseTypes';
import { getInfoRequest } from 'services/getInfoRequest';

interface Props {
  initPage?: number;
  category: CategoryRequestEnum;
}

const ListWithPagination: React.FC<Props> = ({ initPage = 1, category }) => {
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
      <Box mt={6} display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box display='flex' justifyContent='center' flexWrap='wrap'>
        {info?.results.map((item, index) => (
          <Box key={item.name} p={1}>
            <Card category={category} character={item} id={index + 1} />
          </Box>
        ))}
        {hasPagination && (
          <ListWithPagination category={category} initPage={initPage + 1} />
        )}
      </Box>
      {!hasPagination && maxPageCount > initPage && (
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Button onClick={() => setHasPagination((prev) => !prev)}>
            Load More
          </Button>
        </Box>
      )}
    </>
  );
};

export default ListWithPagination;
