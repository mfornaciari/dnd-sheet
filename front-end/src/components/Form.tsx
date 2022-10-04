import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import '@/style/Form.css';
import type {
  FetchedData,
  CharacterValues,
  Tabs,
  TabKind,
  Level,
  CharacterClass,
} from '@/types';
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

const initialCharacterValues: CharacterValues = {
  name: '',
  race: '0',
  characterClass: '0',
  experience: '0',
}

export default function Form() {
  const { loading, error, data } = useQuery<FetchedData>(GET_DATA);
  const methods = useForm({ defaultValues: initialCharacterValues });
  const [activeTab, setActiveTab] = useState<TabKind>('personal');
  const characterValues = methods.watch();

  useEffect(() => {
    localStorage.setItem('characterValues', JSON.stringify(characterValues));
  }, [characterValues]);

  if (loading) return <StatusMessage message='loading' />;
  if (error || !data) return <StatusMessage message='error' />;

  const { races, characterClasses, levels } = data;
  const selectedClassId = methods.watch('characterClass');
  const selectedClassName = findClassName(characterClasses, selectedClassId);
  const characterExperience = methods.watch('experience');
  const currentLevel = calculateLevel(levels, characterExperience);
  const downloadURL = generateURL(methods.getValues());
  const tabPanels: Tabs = {
    personal: <TabPersonal />,
    attributes: <TabAttributes />,
    characterClass: <TabCharacterClass selectedClassName={selectedClassName} />,
    spells: <TabSpells />,
    items: <TabItems />,
  }
  const tabKinds = Object.keys(tabPanels) as TabKind[];

  async function handleFileChange(files: FileList | null) {
    if (files) {
      const currentFile = files[0];
      const valuesText = await currentFile.text();
      const valuesJson: CharacterValues = JSON.parse(valuesText);
      methods.reset(valuesJson);
    }
  }

  return (
    <FormProvider { ...methods }>
      <form>
        <section id='form-top'>
          <InputText name='name' placeholderText='Nome do personagem' />

          <Select name='race' optionData={races} />

          <Select name='characterClass' optionData={characterClasses} />

          <InputNumber name='experience' minValue='0' maxValue='999999' />

          <div role='region' aria-labelledby='levelText' className='top-div small-top-div'>
            <p className='field-input'>
              <strong id='levelText'>Nível</strong> <strong>{currentLevel}</strong>
            </p>
          </div>

          <div className='top-div small-top-div'>
            <a
              role='button'
              id='save-button'
              href={downloadURL}
              download={methods.getValues('name')}
              className='field-input top-button'
            >
              <strong>Salvar</strong>
            </a>

            <label
              role='button'
              htmlFor='loading-input'
              className='field-input top-button'
            >
              <strong>Carregar</strong>
            </label>
            <input
              type='file'
              id='loading-input'
              accept='.json'
              onChange={event => handleFileChange(event.currentTarget.files)}
              hidden
            />
          </div>
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
              handleClick={() => setActiveTab(tabKind)}
              isSelected={activeTab === tabKind}
              selectedClassName={tabKind === 'characterClass' ? selectedClassName : ''}
            />
          )}
        </ul>
      </form>
    </FormProvider>
  );
}

function calculateLevel(levels: Level[], currentXp: string): number {
  const xpAsNumber = Number(currentXp);
  const foundLevelInfo = levels.find(level =>
    level.minExperience <= xpAsNumber && level.maxExperience >= xpAsNumber
  );
  if (!foundLevelInfo) return 20; // XP over 999.999

  return foundLevelInfo.level;
}

function findClassName(characterClasses: CharacterClass[], selectedClassId: string): string {
  const foundClass = characterClasses.find(characterClass =>
      characterClass.id === selectedClassId
    );
  if (foundClass) return foundClass.name;

  return 'characterClass';
}
