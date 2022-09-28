import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FetchedDataType, CharacterValuesType, TabsType, TabNameType } from '@/types';
import GET_DATA from '@/queries/get_data';
import LoadingMessage from '@/components/LoadingMessage';
import FormTop from '@/components/FormTop';
import TabList from '@/components/TabList';
import TabPersonal from '@/components/tabs/TabPersonal';
import TabAttributes from '@/components/tabs/TabAttributes';
import TabCharacterClass from '@/components/tabs/TabCharacterClass';
import TabSpells from '@/components/tabs/TabSpells';
import TabItems from '@/components/tabs/TabItems';

const tabs: TabsType = {
  personal: <TabPersonal />,
  attributes: <TabAttributes />,
  characterClass: <TabCharacterClass />,
  spells: <TabSpells />,
  items: <TabItems />,
}

const initialCharacterData: CharacterValuesType = {
  name: '',
  race: '0',
  characterClass: '0',
  experience: 0,
}

export default function Form() {
  const { loading, data } = useQuery<FetchedDataType>(GET_DATA);
  const methods = useForm({ defaultValues: initialCharacterData });
  const [activeTab, setActiveTab] = useState<TabNameType>('personal');
  const selectedClassId = methods.watch('characterClass');
  const selectedClassName = findClassName(data, selectedClassId);
  const tabNames = ['personal', 'attributes', selectedClassName, 'spells', 'items'];

  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const clickedTabName = event.currentTarget.name as TabNameType;
    setActiveTab(prevActiveTab => clickedTabName);
  }

  if (loading) return <LoadingMessage />;

  return (
    <FormProvider {...methods}>
      {data &&
        <form>
          <FormTop fetchedData={data} />

          {tabs[activeTab]}

          <TabList
            tabNames={tabNames}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        </form>
      }
    </FormProvider>
  );
}

function findClassName(data: FetchedDataType | undefined, selectedClassId: string): string {
  if (data) {

    const foundClass = data.characterClasses.find(characterClass => {
      return characterClass.id === selectedClassId
    });
    if (foundClass) {
      return foundClass.name;
    }
  }

  return 'characterClass';
}
