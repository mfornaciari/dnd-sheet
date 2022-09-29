import { render, screen, within } from '@testing-library/react';
import assert from 'assert';
import i18next from 'i18next';
import type { OptionDataType } from '@/types';
import TestWrapper from './TestWrapper';
import fetchedDataMock from './fetchedDataMock.json';
import Select from '@/components/Select';

describe('Select', () => {
  const optionDataMock = fetchedDataMock.characterClasses;

  it('renders correctly', () => {
    render(
      <TestWrapper>
        <Select name='test' optionData={optionDataMock} />
      </TestWrapper>
    );
    const input: HTMLInputElement = screen.getByRole('combobox', { name: 'test' });
    const inputOptions: HTMLOptionElement[] = within(input).getAllByRole('option');
    for (const option of inputOptions) {
      const regex = createOptionRegex(optionDataMock, option);
      expect(option).toHaveTextContent(regex);
    }
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
