import React, { useState } from 'react';
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';

interface SearchInputProps {
  onSearch: (searchTerm: string) => any;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <StyledContainer maxWidth="sm">
      <TextField
        variant="outlined"
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchTerm !== '' && (
                <IconButton
                  onClick={() => onChange('')}
                  edge="end"
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </StyledContainer>
  );
};

export default React.memo(SearchInput);

const StyledContainer = styled(Container)`
  margin: ${({ theme }) => theme.spacing(4)}px auto;
`;
