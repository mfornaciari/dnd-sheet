import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import assert from 'assert';
import i18next from 'i18next';
import { OptionDataType } from '@/types';
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
  const errorMocks = [
    {
      request: {
        query: GET_DATA,
      },
      error: new Error('An error occurred'),
    }
  ];

  function TestForm() {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
  }

  function ErrorTestForm() {
    return(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
  }

  it('shows error message when data was not fetched', async () => {
    render(<ErrorTestForm />);
    const statusMessage = screen.getByRole('status');

    await waitFor(() => expect(statusMessage).toHaveTextContent(/^Erro$/));
  });

  it('changes active panel when clicking on tab buttons', async () => {
    render(<TestForm />);
    await waitForElementToBeRemoved(() => screen.getByRole('status', { name: 'Carregando...' }));
    const tabList: HTMLDivElement = screen.getByRole('tablist', { name: 'Abas' });
    const tabPersonal: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Pessoal' });
    const tabAttributes: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Atributos' });
    const tabCharacterClass: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Classe' });
    const tabSpells: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Magias' });
    const tabItems: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Itens' });

    let activeTabPanel = screen.getByRole('tabpanel', { name: 'Pessoal' });
    expect(activeTabPanel).toHaveTextContent(/^Pessoal$/);
    expect(tabPersonal).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabAttributes);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Atributos' });
    expect(activeTabPanel).toHaveTextContent(/^Atributos$/);
    expect(tabAttributes).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabCharacterClass);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Classe' });
    expect(activeTabPanel).toHaveTextContent(/^Classe$/);
    expect(tabCharacterClass).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabSpells);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Magias' });
    expect(activeTabPanel).toHaveTextContent(/^Magias$/);
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

  it('changes class tab name when user selects new class', async () => {
    render(<TestForm />);
    await waitForElementToBeRemoved(() => screen.getByRole('status', { name: 'Carregando...' }));
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });

    await userEvent.selectOptions(classInput, 'Bardo');
    const tabCharacterClass: HTMLButtonElement = screen.getByRole('tab', { name: 'Bardo' });
    await userEvent.click(tabCharacterClass);

    expect(screen.getByRole('tabpanel', { name: 'Classe' })).toHaveTextContent(/^Bardo$/);
  });

  it('renders top correctly', async () => {
    render(<TestForm />);
    await waitForElementToBeRemoved(() => screen.getByRole('status', { name: 'Carregando...' }));
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
    render(<TestForm />);
    await waitForElementToBeRemoved(() => screen.getByRole('status', { name: 'Carregando...' }));
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    await userEvent.type(xpInput, '300');

    expect(levelDiv).toHaveTextContent(/^Nível 2$/);
  });

  it('shows level as 20 if experience value over 999.999 is set', async () => {
    render(<TestForm />);
    await waitForElementToBeRemoved(() => screen.getByRole('status', { name: 'Carregando...' }));
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    await userEvent.type(xpInput, '1000000');

    expect(levelDiv).toHaveTextContent(/^Nível 20$/);
  });
});

function createOptionRegex(data: OptionDataType[], option: HTMLOptionElement): RegExp {
  const value = getOptionValue(option);
  const name = getOptionName(data, value);
  return new RegExp(`^${name}$`);
}

function getOptionName(data: OptionDataType[], value: string): string {
  const foundEntry = data.find(item => item.id === value);
  assert(foundEntry);
  return i18next.t(foundEntry.name);
}

function getOptionValue(option: HTMLOptionElement): string {
  return String(option.getAttribute('value'));
}
