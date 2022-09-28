import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import InputNumber from '@/components/InputNumber';

describe('InputNumber', () => {
  function TestInputNumber() {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <InputNumber name='test' />
      </FormProvider>
    );
  }

  it('does not allow user to type in non-numeric characters', async () => {
    render(<TestInputNumber />);
    const input = screen.getByRole('spinbutton', { name: 'test' });

    await userEvent.type(input, '!-.,1a2');

    expect(input).toHaveValue(12);
    expect(input).toHaveDisplayValue('12');
  });
});
