import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { strict as assert } from 'node:assert';
import { CharacterDataType, OptionDataType } from '@/types';
import fetchedDataMock from './fetchedDataMock.json';
import FormTop from '@/components/FormTop';

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

  function createOptionRegex(data: OptionDataType[], option: HTMLOptionElement) {
    const value = getOptionValue(option);
    const name = getOptionName(data, value);
    return new RegExp(`^${name}$`);
  }

  function getOptionName(data: OptionDataType[], value: number) {
    const foundEntry = data.find(item => item.id === value);
    assert(foundEntry);
    return foundEntry.name;
  }

  function getOptionValue(option: HTMLOptionElement) {
    return Number(option.getAttribute('value'));
  }

  it('renders correctly', () => {
    render(<TestFormTop />);
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome'});
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const raceOptions: HTMLOptionElement[] = within(raceInput).getAllByRole('option');
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const classOptions: HTMLOptionElement[] = within(classInput).getAllByRole('option');
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    expect(nameInput).toHaveAttribute('placeholder', 'Nome do personagem');
    for (const raceOption of raceOptions) {
      const raceRegex = createOptionRegex(fetchedDataMock.races, raceOption);
      expect(raceOption).toHaveTextContent(raceRegex);
    }
    for (const classOption of classOptions) {
      const classRegex = createOptionRegex(fetchedDataMock.characterClasses, classOption);
      expect(classOption).toHaveTextContent(classRegex);
    }
    expect(xpInput).toHaveAttribute('min', '0');
    expect(levelDiv).toHaveTextContent(/^Nível 1$/);
  });

  it('increases level based on character experience', async () => {
    render(<TestFormTop />);
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    await userEvent.type(xpInput, '300');

    expect(levelDiv).toHaveTextContent(/^Nível 2$/);
  });

  it('shows level as 20 if experience value over 999.999 is set', async () => {
    render(<TestFormTop />);
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    await userEvent.type(xpInput, '1000000');

    expect(levelDiv).toHaveTextContent(/^Nível 20$/);
  });
});
