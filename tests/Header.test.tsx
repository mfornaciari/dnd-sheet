import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import raceData from '../data/raceData.json';
import classData from '../data/classData.json';
import Header from '../src/components/Header';

describe('Header', () => {
  const raceNames: string[] = raceData.races.map(characterRace => characterRace.name);
  const classNames: string[] = classData.classes.map(characterClass => characterClass.name);

  it('renders correctly', () => {
    render(<Header />);
    const nameInput = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput = screen.getByRole('combobox', { name: 'Raça' });
    const raceOptions = within(raceInput).getAllByRole('option');
    const classInput = screen.getByRole('combobox', { name: 'Classe' });
    const classOptions = within(classInput).getAllByRole('option');
    const xpInput = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv = screen.getByRole('region', { name: 'Nível' });

    expect(nameInput).toHaveAttribute('placeholder', 'Nome do personagem');
    for (const raceOption of raceOptions) {
      const optionValue = Number(raceOption.getAttribute('value'));
      expect(raceOption.textContent).toEqual(raceNames[optionValue]);
    }
    for (const classOption of classOptions) {
      const optionValue = Number(classOption.getAttribute('value'));
      expect(classOption.textContent).toEqual(classNames[optionValue]);
    }
    expect(xpInput).toHaveAttribute('min', '0');
    expect(xpInput).toHaveAttribute('max', '355000');
    expect(levelDiv).toHaveTextContent('Nível 1');
  });

  it('increases level based on character experience', () => {

  });
});
