import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { strict as assert } from 'node:assert';
import '../src/services/i18n.ts';
import type { OptionDataType } from '../src/types';
import Form from '../src/components/Form';

const responseMock = {
  json: () => {
    return {
      data: {
        characterClasses: classData.classes,
        races: raceData.races,
        levels: levelData.levels,
      }
    }
  }
}

globalThis.fetch = jest.fn().mockResolvedValue(responseMock) as jest.Mock;

describe('Form', () => {
  it('renders correctly', async () => {
    render(<Form />);
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const raceOptions: HTMLOptionElement[] = await within(raceInput).findAllByRole('option');
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const classOptions: HTMLOptionElement[] = await within(classInput).findAllByRole('option');
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    expect(nameInput).toHaveAttribute('placeholder', 'Nome do personagem');
    for (const raceOption of raceOptions) {
      const raceRegex = createOptionRegex(raceData.races, raceOption);
      expect(raceOption).toHaveTextContent(raceRegex);
    }
    for (const classOption of classOptions) {
      const classRegex = createOptionRegex(classData.classes, classOption);
      expect(classOption).toHaveTextContent(classRegex);
    }
    expect(xpInput).toHaveAttribute('min', '0');
    expect(levelDiv).toHaveTextContent(/^Nível 1$/);
  });

  it('increases level based on character experience', async () => {
    const levels = levelData.levels;
    render(<Form />);
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });
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
    render(<Form />);
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });
    const levelDiv: HTMLDivElement = screen.getByRole('region', { name: 'Nível' });

    await userEvent.type(xpInput, '1000000');

    expect(levelDiv).toHaveTextContent(/^Nível 20$/);
  });

  it('saves character data to local storage', async () => {
    render(<Form />);
    const nameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Nome' });
    const raceInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Raça' });
    const dwarfRaceId: string = '0';
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });
    const fighterClassId: string = '7';
    const xpInput: HTMLInputElement = screen.getByRole('spinbutton', { name: 'Experiência' });

    await userEvent.type(nameInput, 'José da Silva');
    await userEvent.selectOptions(raceInput, within(raceInput).getByRole('option', { name: 'Anão' }));
    await userEvent.selectOptions(classInput, within(classInput).getByRole('option', { name: 'Guerreiro' }));
    await userEvent.type(xpInput, '300');

    const storedData = JSON.parse(localStorage.characterData);
    const expectedData = {
      'name': 'José da Silva',
      'race': dwarfRaceId,
      'class': fighterClassId,
      'experience': '300',
    };
    expect(storedData).toEqual(expectedData);
  });
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

const raceData = {
  "races": [
    {
      "id": 0,
      "name": "Anão"
    },
    {
      "id": 1,
      "name": "Draconato"
    },
    {
      "id": 2,
      "name": "Elfo"
    },
    {
      "id": 3,
      "name": "Gnomo"
    },
    {
      "id": 4,
      "name": "Humano"
    },
    {
      "id": 5,
      "name": "Meio-elfo"
    },
    {
      "id": 6,
      "name": "Meio-orc"
    },
    {
      "id": 7,
      "name": "Pequenino"
    },
    {
      "id": 8,
      "name": "Tiferino"
    }
  ]
}

const classData = {
  "classes": [
    {
      "id": 0,
      "name": "Bárbaro"
    },
    {
      "id": 1,
      "name": "Bardo"
    },
    {
      "id": 2,
      "name": "Bruxo"
    },
    {
      "id": 3,
      "name": "Clérigo"
    },
    {
      "id": 4,
      "name": "Druida"
    },
    {
      "id": 5,
      "name": "Feiticeiro"
    },
    {
      "id": 6,
      "name": "Guardião"
    },
    {
      "id": 7,
      "name": "Guerreiro"
    },
    {
      "id": 8,
      "name": "Ladino"
    },
    {
      "id": 9,
      "name": "Mago"
    },
    {
      "id": 10,
      "name": "Monge"
    },
    {
      "id": 11,
      "name": "Paladino"
    }
  ]
}

const levelData = {
  "levels": [
    {
      "id": 0,
      "level": 1,
      "minExperience": 0,
      "maxExperience": 299
    },
    {
      "id": 1,
      "level": 2,
      "minExperience": 300,
      "maxExperience": 899
    },
    {
      "id": 2,
      "level": 3,
      "minExperience": 900,
      "maxExperience": 2699
    },
    {
      "id": 3,
      "level": 4,
      "minExperience": 2700,
      "maxExperience": 6499
    },
    {
      "id": 4,
      "level": 5,
      "minExperience": 6500,
      "maxExperience": 13999
    },
    {
      "id": 5,
      "level": 6,
      "minExperience": 14000,
      "maxExperience": 22999
    },
    {
      "id": 6,
      "level": 7,
      "minExperience": 23000,
      "maxExperience": 33999
    },
    {
      "id": 7,
      "level": 8,
      "minExperience": 34000,
      "maxExperience": 47999
    },
    {
      "id": 8,
      "level": 9,
      "minExperience": 48000,
      "maxExperience": 63999
    },
    {
      "id": 9,
      "level": 10,
      "minExperience": 64000,
      "maxExperience": 84999
    },
    {
      "id": 10,
      "level": 11,
      "minExperience": 85000,
      "maxExperience": 99999
    },
    {
      "id": 11,
      "level": 12,
      "minExperience": 100000,
      "maxExperience": 119999
    },
    {
      "id": 12,
      "level": 13,
      "minExperience": 120000,
      "maxExperience": 139999
    },
    {
      "id": 13,
      "level": 14,
      "minExperience": 140000,
      "maxExperience": 164999
    },
    {
      "id": 14,
      "level": 15,
      "minExperience": 165000,
      "maxExperience": 194999
    },
    {
      "id": 15,
      "level": 16,
      "minExperience": 195000,
      "maxExperience": 224999
    },
    {
      "id": 16,
      "level": 17,
      "minExperience": 225000,
      "maxExperience": 264999
    },
    {
      "id": 17,
      "level": 18,
      "minExperience": 265000,
      "maxExperience": 304999
    },
    {
      "id": 18,
      "level": 19,
      "minExperience": 305000,
      "maxExperience": 354999
    },
    {
      "id": 19,
      "level": 20,
      "minExperience": 355000,
      "maxExperience": 999999
    }
  ]
}
