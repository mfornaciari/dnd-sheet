import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';
import ptbr from '../locales/pt-BR.json';
import InputNumber from '../src/components/InputNumber';
import { useForm, FormProvider } from 'react-hook-form';

i18next.init({
  lng: 'ptbr',
  debug: false,
  resources: ptbr
});

describe('InputNumber', () => {
  it('does not allow user to type in non-numeric characters', async () => {
    function TestInput() {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <InputNumber name='test' />
        </FormProvider>
      );
    }
    render(<TestInput />);
    const input = screen.getByRole('spinbutton', { name: 'test' });

    await userEvent.type(input, '!-.,1a2');

    expect(input).toHaveValue(12);
    expect(input).toHaveDisplayValue('12');
  });
});
