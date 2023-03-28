import { render, screen } from '@testing-library/react';
import App from './App';

test('renders initial links', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ciudades/i);
  expect(linkElement).toBeInTheDocument();
});
