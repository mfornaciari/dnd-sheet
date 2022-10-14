import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import '@/style/Form.css';
import type { FetchedData, CharacterValues, Tabs, TabKind } from '@/types';
import GET_DATA from '@/queries/get_data';
import { calculateLevel, generateURL, findClassName } from '@/helpers/formHelpers';
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

export default function Form() {
  const { loading, error, data } = useQuery<FetchedData>(GET_DATA);
  const formMethods = useForm<CharacterValues>({
    mode: 'onTouched',
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
  const tabPanels: Tabs = {
    personal: <TabPersonal />,
    attributes: <TabAttributes />,
    characterClass: <TabCharacterClass selectedClassName={selectedClassName} />,
    spells: <TabSpells />,
    items: <TabItems />,
  };
  const tabKinds = Object.keys(tabPanels) as TabKind[];
  const formValid = formMethods.formState.isValid;
  const downloadURL = generateURL(formMethods.getValues());

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
          <InputText name='name' required />

          <Select name='race' optionData={races} required />

          <Select name='characterClass' optionData={characterClasses} required />

          <InputNumber name='experience' minValue='0' maxValue='999999' />

          <Container hiddenTitle='Nível'>
            <strong className='text'>Nível {currentLevel}</strong>
          </Container>

          <a
            role='button'
            id='save-button'
            href={formValid ? downloadURL : '#'}
            download={formValid ? formMethods.getValues('name') : undefined}
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
