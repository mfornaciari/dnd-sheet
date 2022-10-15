import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchedDataMock from './fetchedDataMock.json';
import { Form } from '@/components/Form';

describe('Form', () => {
  const mockCharacterValues = JSON.stringify({
    name: 'Bruenor',
    race: fetchedDataMock.data.races[0].id, // 1 - Anão
    characterClass: fetchedDataMock.data.characterClasses[0].id, // 1 - barbarian
    experience: 300,
  });
  const mockFile = new File([mockCharacterValues], 'mock.json', { type: 'application/json' });
  File.prototype.text = jest.fn().mockResolvedValue(mockCharacterValues);

  afterEach(() => {
    localStorage.clear();
  });

  it('renders and works correctly', async () => {
    render(<Form data={fetchedDataMock.data} />);
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const characterClassInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });
    const saveButton: HTMLAnchorElement = screen.getByRole('button', { name: 'Salvar' });
    const loadButton: HTMLLabelElement = screen.getByRole('button', { name: 'Carregar' });

    // Fields are empty when opening app
    expect(nameInput).toHaveDisplayValue('');
    expect(raceInput).toHaveDisplayValue([]);
    expect(characterClassInput).toHaveDisplayValue([]);
    expect(xpInput).toHaveDisplayValue('0');
    expect(levelDiv).toHaveTextContent(/^Nível 1$/);

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
    render(<Form data={fetchedDataMock.data} />);
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
