import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
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

  it('renders header correctly', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    const nameInput = within(header).getByRole('textbox', { name: 'Nome' });
    const raceInput = within(header).getByRole('combobox', { name: 'Raça' });
    const raceOptions = within(raceInput).getAllByRole('option');
    const classInput = within(header).getByRole('combobox', { name: 'Classe' });
    const classOptions = within(classInput).getAllByRole('option');
    const xpInput = within(header).getByRole('spinbutton', { name: 'Experiência' });
    const levelParagraph = within(header).getByRole('region', { name: 'Nível' });

    expect(nameInput).toHaveAttribute('placeholder', 'Nome do personagem');
    for (const option of raceOptions) {
      const optionValue = option.getAttribute('value');
      expect(option.textContent).toEqual(raceNames[Number(optionValue)]);
    }
    for (const option of classOptions) {
      const optionValue = option.getAttribute('value');
      expect(option.textContent).toEqual(classNames[Number(optionValue)]);
    }
    expect(xpInput).toHaveAttribute('min', '0');
    expect(levelParagraph).toHaveTextContent('Nível 1');
  });
});
