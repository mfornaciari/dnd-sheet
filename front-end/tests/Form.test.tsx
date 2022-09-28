import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { strict as assert } from 'node:assert';
import { MockedProvider } from '@apollo/client/testing';
import type { OptionDataType } from '@/types';
import fetchedDataMock from './fetchedDataMock.json';
import Form from '@/components/Form';
import GET_DATA from '@/queries/get_data';

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
    const selectedTab: HTMLDivElement = screen.getByRole('tabpanel', { name: 'Pessoal' });
    const tabList: HTMLDivElement = screen.getByRole('tablist', { name: 'Abas' });
    const tabPersonal: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Pessoal' });
    const tabAttributes: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Atributos' });
    const tabCharacterClass: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Classe' });
    const tabSpells: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Magias' });
    const tabItems: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Itens' });

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
    expect(tabPersonal).toHaveTextContent(/^Pessoal$/);
    expect(tabPersonal).toHaveAttribute('aria-selected', 'true');
    expect(tabAttributes).toHaveTextContent(/^Atributos$/);
    expect(tabAttributes).toHaveAttribute('aria-selected', 'false');
    expect(tabCharacterClass).toHaveTextContent(/^Classe$/);
    expect(tabCharacterClass).toHaveAttribute('aria-selected', 'false');
    expect(tabSpells).toHaveTextContent(/^Magias$/);
    expect(tabSpells).toHaveAttribute('aria-selected', 'false');
    expect(tabItems).toHaveTextContent(/^Itens$/);
    expect(tabItems).toHaveAttribute('aria-selected', 'false');
    expect(selectedTab).toHaveTextContent(/^Pessoal$/);
  });

  it('changes active panel when clicking on tab buttons', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByRole('status', { name: 'Carregando...' }));
    const tabList: HTMLDivElement = screen.getByRole('tablist', { name: 'Abas' });
    const tabPersonal: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Pessoal' });
    const tabAttributes: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Atributos' });
    const tabCharacterClass: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Classe' });
    const tabSpells: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Magias' });
    const tabItems: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Itens' });

    await userEvent.click(tabPersonal);

    let activeTabPanel = screen.getByRole('tabpanel', { name: 'Pessoal' });
    expect(activeTabPanel).toBeInTheDocument();
    expect(tabPersonal).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabAttributes);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Atributos' });
    expect(activeTabPanel).toBeInTheDocument();
    expect(tabAttributes).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabCharacterClass);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Classe' });
    expect(activeTabPanel).toBeInTheDocument();
    expect(tabCharacterClass).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabSpells);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Magias' });
    expect(activeTabPanel).toBeInTheDocument();
    expect(tabSpells).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabItems);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Itens' });
    expect(activeTabPanel).toHaveTextContent(/^Itens$/);
    expect(tabItems).toHaveAttribute('aria-selected', 'true');
    expect(tabPersonal).toHaveAttribute('aria-selected', 'false');
    expect(tabAttributes).toHaveAttribute('aria-selected', 'false');
    expect(tabCharacterClass).toHaveAttribute('aria-selected', 'false');
    expect(tabSpells).toHaveAttribute('aria-selected', 'false');
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
});


