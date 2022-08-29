import React, { useState } from 'react';
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import ListWithPagination from 'components/ListWithPagination';
import { CategoryRequestEnum } from 'utils/constants';
import SearchBar from 'components/SearchBar';

const InfoList: React.FC = () => {
  const [category, setCategory] = useState(CategoryRequestEnum.people);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCategory(e.target.value as CategoryRequestEnum);

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box width={1} maxWidth='500px'>
        <SearchBar category={category} />
        <Box py={2} display='flex' justifyContent='center'>
          <RadioGroup row value={category} onChange={handleCategoryChange}>
            <FormControlLabel
              value={CategoryRequestEnum.people}
              control={<Radio />}
              label={CategoryRequestEnum.people}
            />
            <FormControlLabel
              value={CategoryRequestEnum.planets}
              control={<Radio />}
              label={CategoryRequestEnum.planets}
            />
          </RadioGroup>
        </Box>
      </Box>
      <ListWithPagination category={category} />
    </Box>
  );
};

export default InfoList;
