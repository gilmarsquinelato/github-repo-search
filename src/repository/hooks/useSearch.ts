import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { useSearchRepositoriesLazyQuery } from '../../generated/graphql';
import { PaginationInfo } from '../models/pagination';
import { Repository } from '../models/repository';

const initialPaginationInfoState: PaginationInfo = {
  currentPage: 0,
  itemsPerPage: 5,
  totalItems: 0,
  lastId: undefined,
};

interface UseSearch {
  repositories: Repository[];
  paginationInfo: PaginationInfo;
  onSearch: (searchTerm: string) => any;
  onSetPage: (page: number) => any;
  onSetItemsPerPage: (itemsPerPage: number) => any;
}

const useSearch = (): UseSearch => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(
    initialPaginationInfoState,
  );

  const [
    searchRepositories,
    { loading, data },
  ] = useSearchRepositoriesLazyQuery();

  useEffect(() => {
    if (!data) return;

    setRepositories((data?.search.nodes as Repository[]) ?? []);
    setPaginationInfo({
      ...paginationInfo,
      lastId: data?.search.pageInfo.endCursor,
      totalItems: data?.search.repositoryCount ?? 0,
    });
  }, [data]);

  const resetState = () => {
    setPaginationInfo(initialPaginationInfoState);
    setRepositories([]);
  };

  const onSearch = debounce((searchTerm: string) => {
    // Reset the lastId and currentPage
    const info: PaginationInfo = {
      ...paginationInfo,
      currentPage: 0,
      lastId: undefined,
    };

    setPaginationInfo(info);
    setSearchTerm(searchTerm);

    // Calling it directly instead of rely on useEffect to avoid infinite loop
    fetchRepositories(searchTerm, info);
  }, 500);

  const onSetPage = (page: number) => {
    // Avoid setting the page if the query is loading, so we don't have a non sync page number
    if (loading) return;

    const info: PaginationInfo = {
      ...paginationInfo,
      currentPage: page,
    };
    setPaginationInfo(info);

    // Calling it directly instead of rely on useEffect to avoid infinite loop
    fetchRepositories(searchTerm, info);
  };

  const onSetItemsPerPage = (itemsPerPage: number) => {
    // Avoid setting the page if the query is loading, so we don't have a non sync page number
    if (loading) return;

    const info: PaginationInfo = {
      ...paginationInfo,
      itemsPerPage: itemsPerPage,
    };
    setPaginationInfo(info);

    // Calling it directly instead of rely on useEffect to avoid infinite loop
    fetchRepositories(searchTerm, info);
  };

  const fetchRepositories = (
    searchTerm: string,
    paginationInfo: PaginationInfo,
  ) => {
    if (!searchTerm) {
      resetState();
      return;
    }

    searchRepositories({
      variables: {
        query: searchTerm,
        first: paginationInfo.itemsPerPage,
        after: paginationInfo.lastId,
      },
    });
  };

  return {
    repositories,
    paginationInfo,
    onSearch,
    onSetPage,
    onSetItemsPerPage,
  };
};

export default useSearch;
