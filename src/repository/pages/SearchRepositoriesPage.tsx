import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../../components/Layout';
import SearchInput from '../../components/SearchInput';
import RepositoryTable from '../components/RepositoryTable';
import useSearch from '../hooks/useSearch';

const SearchRepositoriesPage: React.FC = () => {
  const {
    repositories,
    paginationInfo,
    onSearch,
    onSetPage,
    onSetItemsPerPage,
  } = useSearch();

  return (
    <Layout>
      <Typography variant="h3" gutterBottom align="center">
        Github Repository Search
      </Typography>

      <SearchInput onSearch={onSearch} />

      <RepositoryTable
        repositories={repositories}
        paginationInfo={paginationInfo}
        onSetPage={onSetPage}
        onSetItemsPerPage={onSetItemsPerPage}
      />
    </Layout>
  );
};

export default SearchRepositoriesPage;
