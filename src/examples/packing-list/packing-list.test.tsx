import { render, screen, within } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  const inputField = screen.getByLabelText('New Item Name');
  expect(inputField).toBeInTheDocument()
});

it(
  'has a "Add New Item" button that is disabled when the input is empty',
  () => {
  render(<PackingList />);

  const inputField = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByLabelText('Add New Item');

  expect(inputField).toHaveValue("")
  expect(addNewItemButton).toBeDisabled();
  },
);

it(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
    const {user} = render(<PackingList />);

    const inputField = screen.getByPlaceholderText('New Item');
    const addNewItemButton = screen.getByLabelText('Add New Item');
  
    expect(inputField).toHaveValue("")
    expect(addNewItemButton).toBeDisabled()

    await user.type(inputField, 'hello world!')

    expect(addNewItemButton).toBeEnabled()
  },
);

it.skip(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
    const {user} = render(<PackingList />);
    console.log(screen.debug())
    const inputField = screen.getByPlaceholderText('New Item');
    const addNewItemButton = screen.getByLabelText('Add New Item');
    const unpackedItemsList = screen.getByTestId('unpacked-items-list');

    expect(unpackedItemsList).toContain(/(Nothing to show.)/)

    expect(inputField).toHaveValue("")
    expect(addNewItemButton).toHaveAttribute('disabled')

    await user.type(inputField, 'Chocolate')

    expect(addNewItemButton).not.toHaveAttribute('disabled')

    await user.click(addNewItemButton);
    console.log(screen.debug())

    const listItems = await within(unpackedItemsList).findAllByRole('listitem');

    expect(listItems).toHaveLength(1);
  });