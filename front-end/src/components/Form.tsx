import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import '@/style/Form.css';
import type { FetchedData, CharacterValues, Tabs, TabKind, Level, CharacterClass } from '@/types';
import GET_DATA from '@/queries/get_data';
import generateURL from '@/services/generateURL';
import StatusMessage from '@/components/StatusMessage';
import Select from '@/components/Select';
import InputNumber from '@/components/InputNumber';
import InputText from '@/components/InputText';
import TabPersonal from '@/components/tabs/TabPersonal';
import TabAttributes from '@/components/tabs/TabAttributes';
import TabCharacterClass from '@/components/tabs/TabCharacterClass';
import TabSpells from '@/components/tabs/TabSpells';
import TabItems from '@/components/tabs/TabItems';
import TabButton from '@/components/TabButton';
import Container from '@/components/Container';

const emptyValues = JSON.stringify({
  name: '',
  race: '0',
  characterClass: '0',
  experience: '0',
});

function calculateLevel(levels: Level[], currentXp: string): number {
  const xpAsNumber = Number(currentXp);
  const foundLevelInfo = levels.find(level => level.minExperience <= xpAsNumber && level.maxExperience >= xpAsNumber);
  if (!foundLevelInfo) return 20; // XP over 999.999

  return foundLevelInfo.level;
}

function findClassName(characterClasses: CharacterClass[], selectedClassId: string): string {
  const foundClass = characterClasses.find(characterClass => characterClass.id === selectedClassId);
  if (foundClass) return foundClass.name;

  return 'characterClass';
}

export default function Form() {
  const { loading, error, data } = useQuery<FetchedData>(GET_DATA);
  const formMethods = useForm<CharacterValues>({
    defaultValues: JSON.parse(localStorage.getItem('characterValues') || emptyValues),
  });
  const [activeTab, setActiveTab] = useState<TabKind>(() => 'personal');
  const characterValues = formMethods.watch();

  useEffect(() => {
    localStorage.setItem('characterValues', JSON.stringify(characterValues));
  }, [characterValues]);

  if (loading) return <StatusMessage message='loading' />;
  if (error || !data) return <StatusMessage message='error' />;

  const { races, characterClasses, levels } = data;
  const selectedClassId = formMethods.watch('characterClass');
  const selectedClassName = findClassName(characterClasses, selectedClassId);
  const characterExperience = formMethods.watch('experience');
  const currentLevel = calculateLevel(levels, characterExperience);
  const downloadURL = generateURL(formMethods.getValues());
  const tabPanels: Tabs = {
    personal: <TabPersonal />,
    attributes: <TabAttributes />,
    characterClass: <TabCharacterClass selectedClassName={selectedClassName} />,
    spells: <TabSpells />,
    items: <TabItems />,
  };
  const tabKinds = Object.keys(tabPanels) as TabKind[];

  async function handleFileChange(files: FileList | null) {
    if (files) {
      const currentFile = files[0];
      const textValues = await currentFile.text();
      const jsonValues: CharacterValues = JSON.parse(textValues);
      formMethods.reset(jsonValues);
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form>
        <section id='form-top'>
          <InputText name='name' />

          <Select name='race' optionData={races} />

          <Select name='characterClass' optionData={characterClasses} />

          <InputNumber name='experience' minValue='0' maxValue='999999' />

          <Container name='level'>
            <strong className='text'>Nível {currentLevel}</strong>
          </Container>

          <a
            role='button'
            id='save-button'
            href={downloadURL}
            download={formMethods.getValues('name')}
            className='top-button'
          >
            <strong>Salvar</strong>
          </a>

          <label role='button' htmlFor='loading-input' className='top-button'>
            <strong>Carregar</strong>
          </label>
          <input
            type='file'
            id='loading-input'
            accept='.json'
            onChange={event => handleFileChange(event.currentTarget.files)}
            hidden
          />
        </section>

        <section id='tab-panel' role='tabpanel' aria-labelledby={activeTab} aria-expanded='true'>
          {tabPanels[activeTab]}
        </section>

        <ul role='tablist' aria-label='Abas' className='tab-list'>
          {tabKinds.map(tabKind => (
            <TabButton
              key={tabKind}
              tabKind={tabKind}
              handleClick={() => setActiveTab(tabKind)}
              isSelected={activeTab === tabKind}
              selectedClassName={tabKind === 'characterClass' ? selectedClassName : ''}
            />
          ))}
        </ul>
      </form>
    </FormProvider>
  );
}
