import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import {
  FetchedDataType,
  CharacterValuesType,
  TabsType,
  TabKindType,
  LevelType,
  CharacterClassType,
} from '@/types';
import GET_DATA from '@/queries/get_data';
import StatusMessage from '@/components/StatusMessage';
import TabPersonal from '@/components/tabs/TabPersonal';
import TabAttributes from '@/components/tabs/TabAttributes';
import TabCharacterClass from '@/components/tabs/TabCharacterClass';
import TabSpells from '@/components/tabs/TabSpells';
import TabItems from '@/components/tabs/TabItems';
import TabButton from './TabButton';
import Select from './Select';
import InputNumber from './InputNumber';
import InputText from './InputText';

const initialCharacterValues: CharacterValuesType = {
  name: '',
  race: '0',
  characterClass: '0',
  experience: '0',
}

export default function Form() {
  const { loading, error, data } = useQuery<FetchedDataType>(GET_DATA);
  const methods = useForm({ defaultValues: initialCharacterValues });
  const [activeTab, setActiveTab] = useState<TabKindType>('personal');
  const characterValues = methods.watch();

  useEffect(() => {
    localStorage.setItem('characterValues', JSON.stringify(characterValues));
  }, [characterValues]);

  if (loading) return <StatusMessage message='loading' />;
  if (error || !data) return <StatusMessage message='error' />;

  const { races, characterClasses, levels } = data;
  const selectedClassId = methods.watch('characterClass');
  const characterExperience = methods.watch('experience');
  const currentLevel = calculateLevel(levels, characterExperience);
  const selectedClassName = findClassName(characterClasses, selectedClassId);
  const tabPanels: TabsType = {
    personal: <TabPersonal />,
    attributes: <TabAttributes />,
    characterClass: <TabCharacterClass selectedClassName={selectedClassName} />,
    spells: <TabSpells />,
    items: <TabItems />,
  }
  const tabKinds = Object.keys(tabPanels) as TabKindType[];

  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const clickedTabKind = event.currentTarget.id as TabKindType;
    setActiveTab(_prevActiveTab => clickedTabKind);
  }

  return (
    <FormProvider { ...methods }>
      <form>
        <section id='form-top'>
          <InputText name='name' placeholderText='Nome do personagem' />

          <Select name='race' optionData={races} />

          <Select name='characterClass' optionData={characterClasses} />

          <InputNumber name='experience' minValue='0' maxValue='999999' />

          <p id='levelParagraph' role='region' aria-labelledby='levelText'>
            <strong id='levelText'>Nível </strong><strong>{currentLevel}</strong>
          </p>
        </section>

        <section
          id='tab-panel'
          role='tabpanel'
          aria-labelledby={activeTab}
          aria-expanded='true'
        >
          {tabPanels[activeTab]}
        </section>

        <ul role='tablist' aria-label='Abas' className='tab-list'>
          {tabKinds.map(tabKind =>
            <TabButton
              key={tabKind}
              tabKind={tabKind}
              handleTabClick={handleTabClick}
              isSelected={activeTab === tabKind}
              selectedClassName={isClassTab(tabKind) ? selectedClassName : ''}
            />
          )}
        </ul>
      </form>
    </FormProvider>
  );
}

function calculateLevel(levels: LevelType[], currentXp: string): number {
  const xpAsNumber = Number(currentXp);
  const foundLevelInfo = levels.find(level =>
    level.minExperience <= xpAsNumber && level.maxExperience >= xpAsNumber
  );
  if (!foundLevelInfo) return 20; // XP over 999.999

  return foundLevelInfo.level;
}

function findClassName(characterClasses: CharacterClassType[], selectedClassId: string): string {
  const foundClass = characterClasses.find(characterClass =>
      characterClass.id === selectedClassId
    );
  if (foundClass) return foundClass.name;

  return 'characterClass';
}

function isClassTab(tabKind: TabKindType): boolean {
  return tabKind === 'characterClass';
}
