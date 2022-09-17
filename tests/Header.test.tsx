import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../src/components/Header';
import type { levelInfo } from '../src/types';
import raceData from '../data/raceData.json';
import classData from '../data/classData.json';
import levelData from '../data/levelData.json';

describe('Header', () => {
  it('renders correctly', () => {
    const raceNames: string[] = raceData.races.map(characterRace => characterRace.name);
    const classNames: string[] = classData.classes.map(characterClass => characterClass.name);

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

  it('increases level based on character experience', async () => {
    render(<Header />);
    const xpInput = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv = screen.getByRole('region', { name: 'Nível' });
    const levels: levelInfo[] = levelData.levels;
    for (const levelInfo of levels) {
      const maxExperience = String(levelInfo.maxExperience);
      const level = String(levelInfo.level);

      userEvent.clear(xpInput);
      await userEvent.type(xpInput, maxExperience);

      expect(levelDiv).toHaveTextContent(level);
    }
  });
});
