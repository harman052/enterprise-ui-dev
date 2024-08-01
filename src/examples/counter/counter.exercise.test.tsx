// @vitest-environment happy-dom

import { render, screen } from './test/utilities.solution';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0')
});

test('it should increment when the "Increment" button is pressed', async () => {
  const {user} = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={5} />)
  
  const initialCount = screen.getByTestId('current-count');
  expect(initialCount).toHaveTextContent('5');

});

test(
  'it should reset the count when the "Reset" button is pressed',
  async () => {
    const {user} = render(<Counter/>)
    const incrementButton = screen.getByRole('button', {name: 'Increment'});
    const initialCount = screen.getByTestId('current-count');

    expect(initialCount).toHaveTextContent('0');

    await user.click(incrementButton)
    expect(initialCount).toHaveTextContent('1');

    const resetButton = screen.getByRole('button', {name: 'Reset'});
    await user.click(resetButton);
    
    expect(initialCount).toHaveTextContent('0');
  },
);
