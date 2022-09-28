import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FetchedDataType, CharacterValuesType, TabsType, TabKindType } from '@/types';
import GET_DATA from '@/queries/get_data';
import LoadingMessage from '@/components/LoadingMessage';
import FormTop from '@/components/FormTop';
import TabList from '@/components/TabList';
import TabPersonal from '@/components/tabs/TabPersonal';
import TabAttributes from '@/components/tabs/TabAttributes';
import TabCharacterClass from '@/components/tabs/TabCharacterClass';
import TabSpells from '@/components/tabs/TabSpells';
import TabItems from '@/components/tabs/TabItems';

const initialCharacterData: CharacterValuesType = {
  name: '',
  race: '0',
  characterClass: '0',
  experience: 0,
}

export default function Form() {
  const { loading, data } = useQuery<FetchedDataType>(GET_DATA);
  const methods = useForm({ defaultValues: initialCharacterData });
  const [activeTab, setActiveTab] = useState<TabKindType>('personal');
  const selectedClassId = methods.watch('characterClass');
  const selectedClassName = findClassName(data, selectedClassId);
  const tabs: TabsType = {
    personal: <TabPersonal />,
    attributes: <TabAttributes />,
    characterClass: <TabCharacterClass selectedClassName={selectedClassName} />,
    spells: <TabSpells />,
    items: <TabItems />,
  }
  const tabKinds = Object.keys(tabs) as TabKindType[];

  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const clickedTabKind = event.currentTarget.id as TabKindType;
    setActiveTab(prevActiveTab => clickedTabKind);
  }

  if (loading) return <LoadingMessage />;

  return (
    <FormProvider {...methods}>
      {data &&
        <form>
          <FormTop fetchedData={data} />

          {tabs[activeTab]}

          <TabList
            tabKinds={tabKinds}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            selectedClassName={selectedClassName}
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
    if (foundClass) return foundClass.name;
  }

  return 'characterClass';
}
