import { fireEvent, render } from '../../../testUtils';
import { PaginationInfo } from '../../models/pagination';
import { Repository } from '../../models/repository';
import RepositoryTable, {
  TABLE_ITEM_TEST_ID,
  TABLE_TEST_ID,
} from '../RepositoryTable';

const initialPaginationInfoState: PaginationInfo = {
  currentPage: 0,
  itemsPerPage: 5,
  totalItems: 0,
  lastId: undefined,
};

const repository: Repository = {
  id: '1',
  name: 'repo',
  stargazerCount: 10,
  forkCount: 20,
};

describe('repository/components/RepositoryTable', () => {
  it('render without error', () => {
    const utils = render(
      <RepositoryTable
        repositories={[]}
        paginationInfo={initialPaginationInfoState}
        onSetPage={() => undefined}
        onSetItemsPerPage={() => undefined}
      />,
    );
    const element = utils.getByTestId(TABLE_TEST_ID);
    expect(element).toBeInTheDocument();
  });

  it('render with data', () => {
    const utils = render(
      <RepositoryTable
        repositories={[repository]}
        paginationInfo={initialPaginationInfoState}
        onSetPage={() => undefined}
        onSetItemsPerPage={() => undefined}
      />,
    );
    const row = utils.getByTestId(`${TABLE_ITEM_TEST_ID}-${repository.id}`);

    expect(row).toBeInTheDocument();

    const childText = (index: number) => row.children.item(index)?.textContent;
    expect(childText(0)).toBe(repository.name);
    expect(childText(1)).toBe(`🌟 ${repository.stargazerCount}`);
    expect(childText(2)).toBe(`🍴 ${repository.forkCount}`);
  });

  it('total items', () => {
    const paginationInfo: PaginationInfo = {
      ...initialPaginationInfoState,
      totalItems: 1,
    };

    const utils = render(
      <RepositoryTable
        repositories={[repository]}
        paginationInfo={paginationInfo}
        onSetPage={() => undefined}
        onSetItemsPerPage={() => undefined}
      />,
    );
    const pageInfo = utils.getByText('1-1 of 1');
    expect(pageInfo).toBeInTheDocument();
  });

  it('pagination disabled', () => {
    const paginationInfo: PaginationInfo = {
      ...initialPaginationInfoState,
      totalItems: 1,
    };

    const utils = render(
      <RepositoryTable
        repositories={[repository]}
        paginationInfo={paginationInfo}
        onSetPage={() => undefined}
        onSetItemsPerPage={() => undefined}
      />,
    );
    const prevPage = utils.getByTitle('Previous page');
    const nextPage = utils.getByTitle('Next page');

    const disabledAttribute = (element: HTMLElement) =>
      element.getAttribute('disabled');

    expect(disabledAttribute(prevPage)).toBeDefined();
    expect(disabledAttribute(nextPage)).toBeDefined();
  });

  it('pagination previous disabled', async () => {
    const paginationInfo: PaginationInfo = {
      ...initialPaginationInfoState,
      totalItems: 10,
    };

    const utils = render(
      <RepositoryTable
        repositories={[repository]}
        paginationInfo={paginationInfo}
        onSetPage={() => undefined}
        onSetItemsPerPage={() => undefined}
      />,
    );
    const prevPage = utils.getByTitle('Previous page');

    const disabledAttribute = (element: HTMLElement) =>
      element.getAttribute('disabled');

    expect(disabledAttribute(prevPage)).toBeDefined();
  });

  it('pagination next disabled', async () => {
    const paginationInfo: PaginationInfo = {
      ...initialPaginationInfoState,
      currentPage: 1,
      totalItems: 10,
    };

    const utils = render(
      <RepositoryTable
        repositories={[repository]}
        paginationInfo={paginationInfo}
        onSetPage={() => undefined}
        onSetItemsPerPage={() => undefined}
      />,
    );
    const nextPage = utils.getByTitle('Next page');

    const disabledAttribute = (element: HTMLElement) =>
      element.getAttribute('disabled');

    expect(disabledAttribute(nextPage)).toBeDefined();
  });

  it('pagination triggering next page', async () => {
    const onSetPage = jest.fn();

    const paginationInfo: PaginationInfo = {
      ...initialPaginationInfoState,
      currentPage: 0,
      totalItems: 10,
    };

    const utils = render(
      <RepositoryTable
        repositories={[repository]}
        paginationInfo={paginationInfo}
        onSetPage={onSetPage}
        onSetItemsPerPage={() => undefined}
      />,
    );
    const nextPage = utils.getByTitle('Next page');

    fireEvent.click(nextPage);

    expect(onSetPage).toHaveBeenCalledWith(1);
  });

  it('pagination triggering previous page', async () => {
    const onSetPage = jest.fn();

    const paginationInfo: PaginationInfo = {
      ...initialPaginationInfoState,
      currentPage: 1,
      totalItems: 10,
    };

    const utils = render(
      <RepositoryTable
        repositories={[repository]}
        paginationInfo={paginationInfo}
        onSetPage={onSetPage}
        onSetItemsPerPage={() => undefined}
      />,
    );
    const prevPage = utils.getByTitle('Previous page');

    fireEvent.click(prevPage);

    expect(onSetPage).toHaveBeenCalledWith(0);
  });

  it('pagination changing items per page', async () => {
    const onSetItemsPerPage = jest.fn();

    const paginationInfo: PaginationInfo = {
      ...initialPaginationInfoState,
      currentPage: 1,
      totalItems: 10,
    };

    const utils = render(
      <RepositoryTable
        repositories={[repository]}
        paginationInfo={paginationInfo}
        onSetPage={() => undefined}
        onSetItemsPerPage={onSetItemsPerPage}
      />,
    );
    const itemsPerPageButton = utils.getByText(paginationInfo.itemsPerPage, {
      selector: 'div[role="button"]',
    });

    fireEvent.mouseDown(itemsPerPageButton);

    const option = utils.getByText(25, { selector: 'li[role="option"]' });
    fireEvent.click(option);

    expect(onSetItemsPerPage).toHaveBeenCalledWith(25);
  });
});
