import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestWrapper from './TestWrapper';
import InputNumber from '@/components/InputNumber';

describe('InputNumber', () => {
  it('renders correctly', () => {
    render(
      <TestWrapper>
        <InputNumber name='test' minValue='0' maxValue='1' />
      </TestWrapper>
    );
    const input = screen.getByRole('spinbutton', { name: 'test'});

    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '1');
  });

  it('does not allow user to type in non-numeric characters', async () => {
    render(
      <TestWrapper>
        <InputNumber name='test' minValue='0' maxValue='1' />
      </TestWrapper>
    );
    const input: HTMLInputElement = screen.getByRole('spinbutton', { name: 'test' });

    await userEvent.type(input, '!-.,1a2');

    expect(input).toHaveValue(12);
    expect(input).toHaveDisplayValue('12');
  });
});
