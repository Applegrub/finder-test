import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Autocomplete as MuiAutocomplete, Box, TextField } from '@mui/material';
import { CharacterInfo, PlanetInfo } from 'services/ResponseTypes';
import { MAIN_INFO_URL } from 'utils/constants';

type Props = {
  options?: Array<CharacterInfo | PlanetInfo>;
  label: string;
  isLoading: boolean;
  value: string;
  noOptionsText: string;
  onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
};

const Autocomplete: React.FC<Props> = ({
  noOptionsText,
  options,
  label,
  isLoading,
  value,
  onChange,
}) => {
  const optionsClear = useMemo(
    () => options?.map(({ name }) => `${name}`),
    [options]
  );

  return (
    <MuiAutocomplete
      loading={isLoading}
      disableClearable
      clearOnBlur
      loadingText='Loading...'
      noOptionsText={noOptionsText}
      options={optionsClear || []}
      renderOption={(_, option) => {
        const { url } = options?.find(
          ({ name }: { name: string }) => name === option
        ) as CharacterInfo | PlanetInfo;
        const linkUrl = url.replace(MAIN_INFO_URL, '');

        return (
          <Link key={option as string} to={linkUrl}>
            <Box pl={2}>{option as string}</Box>
          </Link>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          label={label}
          onChange={onChange}
          variant='outlined'
        />
      )}
    />
  );
};
export default Autocomplete;
