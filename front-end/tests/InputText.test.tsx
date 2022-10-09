import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestWrapper from './TestWrapper';
import InputText from '@/components/InputText';

describe('InputText', () => {
  it('renders correctly', async () => {
    render(
      <TestWrapper>
        <InputText name='test label' placeholderText='placeholder text' required />
      </TestWrapper>
    );
    const input: HTMLInputElement = screen.getByRole('textbox');

    // Has correct name, placeholder and container class
    expect(input).toHaveAccessibleName('test label');
    expect(input).toHaveAttribute('placeholder', 'placeholder text');
    expect(input.parentElement).toHaveClass('container');

    // Gets a red outline around container when required and left empty
    await userEvent.click(input);
    await userEvent.click(document.body);

    expect(input.parentElement).toHaveClass('container invalid');
  });
});
