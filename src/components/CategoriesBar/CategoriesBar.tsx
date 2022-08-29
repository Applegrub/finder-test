import React from 'react';
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { CategoryRequestEnum } from 'utils/constants';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { changeCategory, selectorCategory } from 'store/categorySlice';

const CategoriesBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectorCategory);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeCategory(e.target.value as CategoryRequestEnum));

  return (
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
  );
};

export default CategoriesBar;
