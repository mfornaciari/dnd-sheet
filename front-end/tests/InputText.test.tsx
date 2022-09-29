import { render, screen } from '@testing-library/react';
import TestWrapper from './TestWrapper';
import InputText from '@/components/InputText';

describe('InputText', () => {
  it('renders correctly', () => {
    render(
      <TestWrapper>
        <InputText name='test' placeholderText='placeholder text' />
      </TestWrapper>
    );
    const input: HTMLInputElement = screen.getByRole('textbox', { name: 'test'});

    expect(input).toHaveAttribute('placeholder', 'placeholder text');
  });
});
