import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputNumber from '../src/components/InputNumber';

describe('InputNumber', () => {
  it('does not allow user to type in non-numeric characters', async () => {
    const setFormValueMock = jest.fn();
    render(<InputNumber labelText='test' setFormValue={setFormValueMock} />);
    const input = screen.getByRole('spinbutton', { name: 'test' });

    await userEvent.type(input, '!-.,1a2');

    expect(input).toHaveValue(12);
    expect(input).toHaveDisplayValue('12');
  });
});
