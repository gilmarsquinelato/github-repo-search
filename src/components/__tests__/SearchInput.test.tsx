import { fireEvent, render } from '../../testUtils';
import SearchInput, { SEARCH_TEST_ID } from '../SearchInput';

describe('components/SearchInput', () => {
  it('render without error', () => {
    const utils = render(<SearchInput onSearch={() => undefined} />);
    const element = utils.getByTestId(SEARCH_TEST_ID);
    expect(element).toBeInTheDocument();
  });

  it('firing onSearch on input text change', () => {
    const onSearch = jest.fn();
    const searchTerm = 'react';

    const utils = render(<SearchInput onSearch={onSearch} />);
    const input = utils.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: searchTerm } });

    expect(onSearch).toHaveBeenCalledWith(searchTerm);
  });
});
