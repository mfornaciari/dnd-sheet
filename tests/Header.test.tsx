import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Header from '../src/components/Header';

describe('Header', () => {
  const raceNames = [
    'Anão',
    'Draconato',
    'Elfo',
    'Gnomo',
    'Humano',
    'Meio-elfo',
    'Meio-orc',
    'Pequenino',
    'Tiferino'
  ]
  const classNames = [
    'Bárbaro',
    'Bardo',
    'Bruxo',
    'Clérigo',
    'Druida',
    'Feiticeiro',
    'Guardião',
    'Guerreiro',
    'Ladino',
    'Mago',
    'Monge',
    'Paladino'
  ]

  it('renders header correctly', () => {
    render(<Header />);
    const nameInput = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput = screen.getByRole('combobox', { name: 'Raça' });
    const raceOptions = within(raceInput).getAllByRole('option');
    const classInput = screen.getByRole('combobox', { name: 'Classe' });
    const classOptions = within(classInput).getAllByRole('option');
    const xpInput = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv = screen.getByRole('region', { name: 'Nível' });

    expect(nameInput).toHaveAttribute('placeholder', 'Nome do personagem');
    for (const option of raceOptions) {
      const optionValue = Number(option.getAttribute('value'));
      expect(option.textContent).toEqual(raceNames[optionValue]);
    }
    for (const option of classOptions) {
      const optionValue = Number(option.getAttribute('value'));
      expect(option.textContent).toEqual(classNames[optionValue]);
    }
    expect(xpInput).toHaveAttribute('min', '0');
    expect(levelDiv).toHaveTextContent('Nível 1');
  });
});
