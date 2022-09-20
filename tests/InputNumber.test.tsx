import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';
import ptbr from '../locales/pt-BR.json';
import InputNumber from '../src/components/InputNumber';

i18next.init({
  lng: 'ptbr',
  debug: false,
  resources: ptbr
});

describe('InputNumber', () => {
  it('does not allow user to type in non-numeric characters', async () => {
    const registerMock = jest.fn();
    render(<InputNumber name='test' register={registerMock} />
    );
    const input = screen.getByRole('spinbutton', { name: 'test' });

    await userEvent.type(input, '!-.,1a2');

    expect(input).toHaveValue(12);
    expect(input).toHaveDisplayValue('12');
  });
});
