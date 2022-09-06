import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../src/components/App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Olá' })).toBeInTheDocument();
  });
});
