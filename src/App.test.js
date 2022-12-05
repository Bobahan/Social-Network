import { MainApp } from './App';
import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
  const div = document.createElement('div');
  render(<MainApp />, div);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
