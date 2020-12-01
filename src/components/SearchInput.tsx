import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Container, { ContainerProps } from '@material-ui/core/Container';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { InputBase } from '@material-ui/core';

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
    <StyledContainer component={Paper} maxWidth="sm">
      <StyledSearchIcon />
      <InputBase
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
        value={searchTerm}
        fullWidth
      />
      {searchTerm !== '' && (
        <IconButton onClick={() => onChange('')} edge="end" size="small">
          <CloseIcon />
        </IconButton>
      )}
    </StyledContainer>
  );
};

export default React.memo(SearchInput);

const StyledContainer = styled(Container)<ContainerProps<any>>(
  ({ theme }) => css`
    margin: ${theme.spacing(4)}px auto;
    padding: ${theme.spacing(1)}px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  `,
);

const StyledSearchIcon = styled(SearchIcon)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`;
