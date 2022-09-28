import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { CharacterDataType } from '@/types';
import fetchedDataMock from './fetchedDataMock.json';
import FormTop from '@/components/FormTop';
import { useEffect } from 'react';

describe('FormTop', () => {
  const initialCharacterData: CharacterDataType = {
    name: '',
    race: 0,
    class: 0,
    experience: 0,
  }

  function TestFormTop() {
    const methods = useForm({ defaultValues: initialCharacterData });

    return (
      <FormProvider {...methods}>
        <FormTop fetchedData={fetchedDataMock} />
      </FormProvider>
    );
  }

  it('increases level based on character experience', async () => {
    render(<TestFormTop />);
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    await userEvent.type(xpInput, '300');

    expect(levelDiv).toHaveTextContent(/^Nível 2$/);
  });
});
