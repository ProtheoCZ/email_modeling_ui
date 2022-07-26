import { render, screen } from '@testing-library/react';
import App_old from './App_old';

test('renders learn react link', () => {
  render(<App_old />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
