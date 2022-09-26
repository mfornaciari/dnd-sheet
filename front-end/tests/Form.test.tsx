import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import '@/services/i18n.ts';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { strict as assert } from 'node:assert';
import type { OptionDataType } from '@/types';
import fetchedDataMock from './fetchedDataMock.json';
import Form, { GET_DATA } from '@/components/Form';

describe('Form', () => {
  const mocks = [
    {
      request: {
        query: GET_DATA,
      },
      result: {
        data: {
          races: fetchedDataMock.races,
          characterClasses: fetchedDataMock.characterClasses,
          levels: fetchedDataMock.levels,
        }
      }
    }
  ];

  it('renders correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByRole('status', { name: 'Carregando...' }));
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const raceOptions: HTMLOptionElement[] = within(raceInput).getAllByRole('option');
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const classOptions: HTMLOptionElement[] = within(classInput).getAllByRole('option');
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });
    const selectedTab: HTMLDivElement = screen.getByRole('tabpanel', { name: 'Aba de detalhes pessoais' });
    const tabList: HTMLDivElement = screen.getByRole('tablist', { name: 'Abas' });
    const tabButtons: HTMLButtonElement[] = within(tabList).getAllByRole('tab');

    expect(nameInput).toHaveAttribute('placeholder', 'Nome do personagem');
    for (const raceOption of raceOptions) {
      const raceRegex = createOptionRegex(mocks[0].result.data.races, raceOption);
      expect(raceOption).toHaveTextContent(raceRegex);
    }
    for (const classOption of classOptions) {
      const classRegex = createOptionRegex(mocks[0].result.data.characterClasses, classOption);
      expect(classOption).toHaveTextContent(classRegex);
    }
    expect(xpInput).toHaveAttribute('min', '0');
    expect(levelDiv).toHaveTextContent(/^Nível 1$/);
    expect
    expect(tabButtons[0]).toHaveTextContent(/^Pessoal$/);
    expect(tabButtons[1]).toHaveTextContent(/^Atributos$/);
    expect(tabButtons[2]).toHaveTextContent(/^Classe$/);
    expect(tabButtons[3]).toHaveTextContent(/^Magias$/);
    expect(tabButtons[4]).toHaveTextContent(/^Itens$/);
    expect(selectedTab).toHaveTextContent(/^Pessoal$/);
  });

  it('increases level based on character experience', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByRole('status', { name: 'Carregando...' }));
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });
    for (const levelInfo of fetchedDataMock.levels) {
      const maxExperience = String(levelInfo.maxExperience);
      const level = String(levelInfo.level);
      const levelRegex = new RegExp(`^Nível ${level}$`);

      await userEvent.clear(xpInput);
      await userEvent.type(xpInput, maxExperience);

      expect(levelDiv).toHaveTextContent(levelRegex);
    }
  });

  it('shows level as 20 if experience value over 999.999 is set', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByRole('status', { name: 'Carregando...' }));
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    await userEvent.type(xpInput, '1000000');

    expect(levelDiv).toHaveTextContent(/^Nível 20$/);
  });

  it('saves character data to local storage', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByRole('status', { name: 'Carregando...' }));
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });

    await userEvent.type(nameInput, 'José da Silva');
    await userEvent.selectOptions(raceInput, within(raceInput).getByRole('option', { name: 'Anão' }));
    await userEvent.selectOptions(classInput, within(classInput).getByRole('option', { name: 'Bárbaro' }));
    await userEvent.type(xpInput, '300');

    const storedData = JSON.parse(localStorage.characterData);
    const expectedData = {
      'name': 'José da Silva',
      'race': '1',
      'class': '1',
      'experience': '300',
    };
    expect(storedData).toEqual(expectedData);
  });
});

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
