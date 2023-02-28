import { App } from './App';
import { render } from '@testing-library/react';

test('renders learn react link', () => {
  const div = document.createElement('div');
  render(<App />, div);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
