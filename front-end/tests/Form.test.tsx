import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import fetchedDataMock from './fetchedDataMock.json';
import Form from '@/components/Form';
import GET_DATA from '@/queries/get_data';

describe('Form', () => {
  const mocks = [
    {
      request: {
        query: GET_DATA,
      },
      result: {
        data: {
          races: fetchedDataMock.races,
          characterClasses: fetchedDataMock.characterClasses,
          levels: fetchedDataMock.levels,
        }
      }
    }
  ];

  it('renders correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByRole('status', { name: 'Carregando...' }));
    const selectedTab: HTMLDivElement = screen.getByRole('tabpanel', { name: 'Pessoal' });
    const tabList: HTMLDivElement = screen.getByRole('tablist', { name: 'Abas' });
    const tabPersonal: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Pessoal' });
    const tabAttributes: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Atributos' });
    const tabCharacterClass: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Classe' });
    const tabSpells: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Magias' });
    const tabItems: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Itens' });

    expect(tabPersonal).toHaveTextContent(/^Pessoal$/);
    expect(tabPersonal).toHaveAttribute('aria-selected', 'true');
    expect(tabAttributes).toHaveTextContent(/^Atributos$/);
    expect(tabAttributes).toHaveAttribute('aria-selected', 'false');
    expect(tabCharacterClass).toHaveTextContent(/^Classe$/);
    expect(tabCharacterClass).toHaveAttribute('aria-selected', 'false');
    expect(tabSpells).toHaveTextContent(/^Magias$/);
    expect(tabSpells).toHaveAttribute('aria-selected', 'false');
    expect(tabItems).toHaveTextContent(/^Itens$/);
    expect(tabItems).toHaveAttribute('aria-selected', 'false');
    expect(selectedTab).toHaveTextContent(/^Pessoal$/);
  });

  it('changes active panel when clicking on tab buttons', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByRole('status', { name: 'Carregando...' }));
    const tabList: HTMLDivElement = screen.getByRole('tablist', { name: 'Abas' });
    const tabPersonal: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Pessoal' });
    const tabAttributes: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Atributos' });
    const tabCharacterClass: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Classe' });
    const tabSpells: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Magias' });
    const tabItems: HTMLButtonElement = within(tabList).getByRole('tab', { name: 'Itens' });

    await userEvent.click(tabPersonal);

    let activeTabPanel = screen.getByRole('tabpanel', { name: 'Pessoal' });
    expect(activeTabPanel).toBeInTheDocument();
    expect(tabPersonal).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabAttributes);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Atributos' });
    expect(activeTabPanel).toBeInTheDocument();
    expect(tabAttributes).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabCharacterClass);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Classe' });
    expect(activeTabPanel).toBeInTheDocument();
    expect(tabCharacterClass).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabSpells);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Magias' });
    expect(activeTabPanel).toBeInTheDocument();
    expect(tabSpells).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tabItems);

    activeTabPanel = screen.getByRole('tabpanel', { name: 'Itens' });
    expect(activeTabPanel).toHaveTextContent(/^Itens$/);
    expect(tabItems).toHaveAttribute('aria-selected', 'true');
    expect(tabPersonal).toHaveAttribute('aria-selected', 'false');
    expect(tabAttributes).toHaveAttribute('aria-selected', 'false');
    expect(tabCharacterClass).toHaveAttribute('aria-selected', 'false');
    expect(tabSpells).toHaveAttribute('aria-selected', 'false');
  });

  it('changes class tab name when user selects new class', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Form />
      </MockedProvider>
    );
    await waitForElementToBeRemoved(screen.getByRole('status', { name: 'Carregando...' }));
    const classInput: HTMLInputElement = screen.getByRole('combobox', { name: 'Classe' });

    await userEvent.selectOptions(classInput, 'Bardo');
    const tabCharacterClass: HTMLButtonElement = screen.getByRole('tab', { name: 'Bardo' });
    await userEvent.click(tabCharacterClass);

    expect(screen.getByRole('tabpanel', { name: 'Classe' })).toHaveTextContent(/^Bardo$/);
  });
});


