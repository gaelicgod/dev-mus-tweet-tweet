import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders twitter string', () => {
  render(<App />);
  const tweetElement = screen.getByText(/twitter/i);
  expect(tweetElement).toBeInTheDocument();
});
