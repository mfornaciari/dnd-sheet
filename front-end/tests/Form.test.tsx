import { render, screen, within, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import fetchedDataMock from './fetchedDataMock.json';
import { GET_DATA } from '@/queries/getData';
import Form from '@/components/Form';

describe('Form', () => {
  const mockCharacterValues = JSON.stringify({
    name: 'Bruenor',
    race: fetchedDataMock.races[0].id, // 1 - Anão
    characterClass: fetchedDataMock.characterClasses[0].id, // 1 - barbarian
    experience: 300,
  });
  const mockFile = new File([mockCharacterValues], 'mock.json', { type: 'application/json' });
  File.prototype.text = jest.fn().mockResolvedValue(mockCharacterValues);
  const queryMocks = [
    {
      request: {
        query: GET_DATA,
      },
      result: {
        data: {
          races: fetchedDataMock.races,
          characterClasses: fetchedDataMock.characterClasses,
          levels: fetchedDataMock.levels,
        },
      },
    },
  ];
  const errorQueryMocks = [
    {
      request: {
        query: GET_DATA,
      },
      error: new Error('An error occurred'),
    },
  ];

  function TestForm() {
    return (
      <MockedProvider mocks={queryMocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
  }

  function ErrorTestForm() {
    return (
      <MockedProvider mocks={errorQueryMocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
  }

  afterEach(() => {
    localStorage.clear();
  });

  it('shows error message when data was not fetched', async () => {
    render(<ErrorTestForm />);
    const statusMessage = screen.getByRole('status');

    await waitFor(() => expect(statusMessage).toHaveTextContent(/^Erro$/));
  });

  it('renders and works correctly', async () => {
    render(<TestForm />);
    await waitForElementToBeRemoved(() => screen.getByRole('status', { name: 'Carregando...' }));
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const characterClassInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });
    const saveButton: HTMLAnchorElement = screen.getByRole('button', { name: 'Salvar' });
    const loadButton: HTMLLabelElement = screen.getByRole('button', { name: 'Carregar' });
    const tabList: HTMLDivElement = screen.getByRole('tablist', { name: 'Abas' });
    const tabPersonal: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Pessoal' });
    const tabAttributes: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Atributos' });
    const tabCharacterClass: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Classe' });
    const tabSpells: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Magias' });
    const tabItems: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Itens' });

    // Fields are empty when opening app
    expect(nameInput).toHaveDisplayValue('');
    expect(raceInput).toHaveDisplayValue([]);
    expect(characterClassInput).toHaveDisplayValue([]);
    expect(xpInput).toHaveDisplayValue('0');
    expect(levelDiv).toHaveTextContent(/^Nível 1$/);

    // Personal tab is active when opening app
    let activeTabPanel = screen.getByRole('tabpanel', { name: 'Pessoal' });
    expect(activeTabPanel).toHaveTextContent(/^Pessoal$/);
    expect(tabPersonal).toHaveAttribute('aria-selected', 'true');

    // Active tab should change when user clicks on tab buttons
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

    // Tabs other than the currently selected one should have aria-selected be false
    expect(tabPersonal).toHaveAttribute('aria-selected', 'false');
    expect(tabAttributes).toHaveAttribute('aria-selected', 'false');
    expect(tabCharacterClass).toHaveAttribute('aria-selected', 'false');
    expect(tabSpells).toHaveAttribute('aria-selected', 'false');

    // Values should be saved to localStorage
    await userEvent.type(nameInput, 'Bruenor');
    await userEvent.selectOptions(raceInput, 'Anão');
    await userEvent.selectOptions(characterClassInput, 'Bárbaro');
    await userEvent.type(xpInput, '300');

    const expectedValues = JSON.stringify({
      name: 'Bruenor',
      race: '1',
      characterClass: '1',
      experience: '300',
    });
    expect(localStorage.characterValues).toEqual(expectedValues);

    // Class tab button should change name to the currently selected class
    const changedTabCharacterClass: HTMLButtonElement = screen.getByRole('tab', { name: 'Bárbaro' });
    expect(changedTabCharacterClass).toHaveTextContent(/^Bárbaro$/);

    // Level should be calculated based on current experience
    expect(levelDiv).toHaveTextContent(/^Nível 2$/);

    // Level should be 20 when current experience > 999.999
    await userEvent.type(xpInput, '0000'); // Total 3.000.000

    expect(levelDiv).toHaveTextContent(/^Nível 20$/);

    // Save button should allow downloading JSON file and name it according to the current character name
    expect(saveButton).toHaveAttribute('href', 'http://localhost:3000/mockURL');
    expect(saveButton).toHaveAttribute('download', 'Bruenor');

    // Save button should be disabled if there is a invalid field
    await userEvent.clear(nameInput);
    await userEvent.click(document.body);

    expect(saveButton).toHaveAttribute('href', '#');

    // Load button should get character info from an uploaded JSON file and update the form
    await userEvent.upload(loadButton, mockFile);
    expect(nameInput).toHaveDisplayValue('Bruenor');
    expect(raceInput).toHaveDisplayValue('Anão');
    expect(characterClassInput).toHaveDisplayValue('Bárbaro');
    expect(xpInput).toHaveDisplayValue('300');
    expect(levelDiv).toHaveTextContent(/^Nível 2$/);
    expect(screen.getByRole('tab', { name: 'Bárbaro' })).toBeInTheDocument();
  });

  it('loads character info from localStorage when opening app', async () => {
    localStorage.setItem('characterValues', mockCharacterValues);
    render(<TestForm />);
    await waitForElementToBeRemoved(() => screen.getByRole('status', { name: 'Carregando...' }));
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    expect(nameInput).toHaveDisplayValue('Bruenor');
    expect(raceInput).toHaveDisplayValue('Anão');
    expect(classInput).toHaveDisplayValue('Bárbaro');
    expect(xpInput).toHaveDisplayValue('300');
    expect(levelDiv).toHaveTextContent(/^Nível 2$/);
    expect(screen.getByRole('tab', { name: 'Bárbaro' })).toHaveTextContent(/^Bárbaro$/);
  });
});
