import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, within} from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
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
  const levels = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
  ]

  it('renders header correctly', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    const nameInput = within(header).getByRole('textbox', { name: 'Nome' });
    const raceInput = within(header).getByRole('combobox', { name: 'Raça' });
    const raceOptions = within(raceInput).getAllByRole('option');
    const classInput = within(header).getByRole('combobox', { name: 'Classe' });
    const classOptions = within(classInput).getAllByRole('option');
    const levelInput = within(header).getByRole('combobox', { name: 'Nível' });
    const levelOptions = within(levelInput).getAllByRole('option');

    expect(nameInput).toHaveAttribute('placeholder', 'Nome do personagem');
    for (const option of raceOptions) {
      const optionValue = option.getAttribute('value');
      expect(option.textContent).toEqual(raceNames[Number(optionValue)]);
    }
    for (const option of classOptions) {
      const optionValue = option.getAttribute('value');
      expect(option.textContent).toEqual(classNames[Number(optionValue)]);
    }
    for (const option of levelOptions) {
      const optionValue = option.getAttribute('value');
      expect(option.textContent).toEqual(levels[Number(optionValue) - 1]);
    }
  });
});
