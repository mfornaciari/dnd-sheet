import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormTop from '../src/components/FormTop';
import type { levelInfo } from '../src/types';
import raceData from '../data/raceData.json';
import classData from '../data/classData.json';
import levelData from '../data/levelData.json';

describe('FormTop', () => {
  it('renders correctly', () => {
    const raceNames: string[] = raceData.races.map(characterRace => characterRace.name);
    const classNames: string[] = classData.classes.map(characterClass => characterClass.name);

    render(<FormTop />);
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const raceOptions = within(raceInput).getAllByRole('option');
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const classOptions = within(classInput).getAllByRole('option');
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv = screen.getByRole('region', { name: 'Nível' });

    expect(nameInput).toHaveAttribute('placeholder', 'Nome do personagem');
    for (const raceOption of raceOptions) {
      const optionValue = Number(raceOption.getAttribute('value'));
      const raceNameRegex = new RegExp(`^${raceNames[optionValue]}$`);
      expect(raceOption).toHaveTextContent(raceNameRegex);
    }
    for (const classOption of classOptions) {
      const optionValue = Number(classOption.getAttribute('value'));
      const classNameRegex = new RegExp(`^${classNames[optionValue]}$`);
      expect(classOption).toHaveTextContent(classNameRegex);
    }
    expect(xpInput).toHaveAttribute('min', '0');
    expect(levelDiv).toHaveTextContent(/^Nível 1$/);
  });

  it('increases level based on character experience', async () => {
    const levels: levelInfo[] = levelData.levels;
    render(<FormTop />);
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv = screen.getByRole('region', { name: 'Nível' });
    for (const levelInfo of levels) {
      const maxExperience = String(levelInfo.maxExperience);
      const level = String(levelInfo.level);
      const levelRegex = new RegExp(`^Nível ${level}$`);

      await userEvent.clear(xpInput);
      await userEvent.type(xpInput, maxExperience);

      expect(levelDiv).toHaveTextContent(levelRegex);
    }
  });

  it('shows level as 20 if experience value over 999.999 is set', async () => {
    render(<FormTop />);
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv = screen.getByRole('region', { name: 'Nível' });

    await userEvent.type(xpInput, '1000000');

    expect(levelDiv).toHaveTextContent(/^Nível 20$/);
  });
});
