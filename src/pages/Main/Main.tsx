import React, { useEffect, useState } from 'react';
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import ListWithPagination from 'components/ListWithPagination';
import { CategoryRequestEnum } from 'utils/constants';
import { useDebounce } from 'utils/useDebounce';
import Autocomplete from 'components/Autocomplete';
import { getInfoRequest } from 'services/getInfoRequest';
import { CharacterInfo, PlanetInfo } from 'services/ResponseTypes';

const Main: React.FC = () => {
  const [category, setCategory] = useState(CategoryRequestEnum.people);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<
    Array<CharacterInfo | PlanetInfo> | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCategory(e.target.value as CategoryRequestEnum);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  const debounceSearch = useDebounce(search, 400);

  useEffect(() => {
    if (debounceSearch) {
      setIsLoading(true);

      getInfoRequest({
        category,
        onComplete: (res) => {
          setIsLoading(false);
          setSearchResults(res.results);
        },
        searchParam: debounceSearch,
      });
    }
  }, [debounceSearch]);

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box width={1} maxWidth='500px'>
        <Autocomplete
          label='Find and open page'
          noOptionsText='Nothing found'
          options={searchResults}
          isLoading={isLoading}
          value={search}
          onChange={handleSearch}
        />
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

export default Main;
