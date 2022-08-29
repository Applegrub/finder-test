import React, { useEffect, useState } from 'react';
import { CharacterInfo, PlanetInfo } from 'services/ResponseTypes';
import { useDebounce } from 'utils/useDebounce';
import { getInfoRequest } from 'services/getInfoRequest';
import Autocomplete from 'components/Autocomplete';
import { useAppSelector } from 'store/hooks';
import { selectorCategory } from 'store/categorySlice';

const SearchBar: React.FC = () => {
  const category = useAppSelector(selectorCategory);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<
    Array<CharacterInfo | PlanetInfo> | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

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
    <Autocomplete
      label='Find and open page'
      noOptionsText='Nothing found'
      options={searchResults}
      isLoading={isLoading}
      value={search}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
