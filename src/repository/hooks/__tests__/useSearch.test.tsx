import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { renderHook, act } from '@testing-library/react-hooks';
import { SearchRepositoriesDocument } from '../../../generated/graphql';
import { Repository } from '../../models/repository';
import useSearch from '../useSearch';

describe('repository/hooks/useSearch', () => {
  it('returning valid data', () => {
    const { result } = renderHook(() => useSearch());

    const {
      current: { repositories, paginationInfo },
    } = result;

    expect(repositories).toHaveLength(0);
    expect(paginationInfo).toEqual({
      currentPage: 0,
      itemsPerPage: 5,
      totalItems: 0,
      lastId: undefined,
    });
  });

  it('search', async () => {
    const mock = getMock([repository], {
      query: repository.name,
      first: 5,
      after: undefined,
    });

    const wrapper = getWrapper([mock]);

    const { result } = renderHook(() => useSearch(), {
      wrapper,
    });

    await act(async () => {
      result.current.onSearch(repository.name);
      // Wait for the debounce
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    expect(result.current.repositories).toEqual([repository]);

    expect(result.current.paginationInfo).toEqual({
      currentPage: 0,
      itemsPerPage: 5,
      totalItems: 1,
      lastId: repository.id,
    });
  });

  it('pagination', async () => {
    const mock = getMock([repository], {
      query: repository.name,
      first: 5,
      after: undefined,
    });

    const mockPage2 = getMock([repository2], {
      query: repository.name,
      first: 5,
      after: repository.id,
    });

    const wrapper = getWrapper([mock, mockPage2]);

    const { result, waitForNextUpdate } = renderHook(() => useSearch(), {
      wrapper,
    });

    await act(async () => {
      result.current.onSearch(repository.name);
      // Wait for the debounce
      await new Promise((resolve) => setTimeout(resolve, 600));

      result.current.onSetPage(1);
      await waitForNextUpdate();

      // Apollo asks for this to make sure it was updated
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.repositories).toEqual([repository2]);

    expect(result.current.paginationInfo).toEqual({
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 1,
      lastId: repository2.id,
    });
  });

  it('items per page', async () => {
    const mock = getMock([repository], {
      query: repository.name,
      first: 5,
      after: undefined,
    });

    const mockPage2 = getMock([repository], {
      query: repository.name,
      first: 25,
      after: repository.id,
    });

    const wrapper = getWrapper([mock, mockPage2]);

    const { result, waitForNextUpdate } = renderHook(() => useSearch(), {
      wrapper,
    });

    await act(async () => {
      result.current.onSearch(repository.name);
      // Wait for the debounce
      await new Promise((resolve) => setTimeout(resolve, 600));

      result.current.onSetItemsPerPage(25);
      await waitForNextUpdate();

      // Apollo asks for this to make sure it was updated
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.repositories).toEqual([repository]);

    expect(result.current.paginationInfo).toEqual({
      currentPage: 0,
      itemsPerPage: 25,
      totalItems: 1,
      lastId: repository.id,
    });
  });
});

function getWrapper(mocks: MockedResponse[]) {
  const Wrapper: React.FC<any> = ({ children }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
  return Wrapper;
}

function getMock<TVariables>(
  repositories: Repository[],
  variables: TVariables,
) {
  return {
    request: {
      query: SearchRepositoriesDocument,
      variables,
    },
    result: {
      data: {
        search: {
          pageInfo: {
            endCursor: repositories[repositories.length - 1].id,
          },
          repositoryCount: 1,
          nodes: repositories.map((repo) => ({
            __typename: 'Repository',
            ...repo,
          })),
        },
      },
    },
  };
}

const repository: Repository = {
  id: '123',
  name: 'test',
  stargazerCount: 10,
  forkCount: 20,
};
const repository2: Repository = {
  id: '321',
  name: 'test 321',
  stargazerCount: 11,
  forkCount: 22,
};
