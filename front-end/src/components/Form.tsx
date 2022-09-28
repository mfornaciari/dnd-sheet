import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FetchedDataType, CharacterDataType, TabsType, TabNameType } from '@/types';
import GET_DATA from '@/queries/get_data';
import LoadingMessage from '@/components/LoadingMessage';
import FormTop from '@/components/FormTop';
import TabList from '@/components/TabList';
import TabPersonal from '@/components/tabs/TabPersonal';
import TabAttributes from '@/components/tabs/TabAttributes';
import TabCharacterClass from '@/components/tabs/TabCharacterClass';
import TabBarbarian from '@/components/tabs/TabBarbarian';
import TabBard from '@/components/tabs/TabBard';
import TabCleric from '@/components/tabs/TabCleric';
import TabDruid from '@/components/tabs/TabDruid';
import TabFighter from '@/components/tabs/TabFighter';
import TabMonk from '@/components/tabs/TabMonk';
import TabPaladin from '@/components/tabs/TabPaladin';
import TabRanger from '@/components/tabs/TabRanger';
import TabRogue from '@/components/tabs/TabRogue';
import TabSorcerer from '@/components/tabs/TabSorcerer';
import TabWizard from '@/components/tabs/TabWizard';
import TabWarlock from '@/components/tabs/TabWarlock';
import TabSpells from '@/components/tabs/TabSpells';
import TabItems from '@/components/tabs/TabItems';

const tabs: TabsType = {
  personal: <TabPersonal />,
  attributes: <TabAttributes />,
  characterClass: <TabCharacterClass />,
  barbarian: <TabBarbarian />,
  bard: <TabBard />,
  cleric: <TabCleric />,
  druid: <TabDruid />,
  fighter: <TabFighter />,
  monk: <TabMonk />,
  paladin: <TabPaladin />,
  ranger: <TabRanger />,
  rogue: <TabRogue />,
  sorcerer: <TabSorcerer />,
  warlock: <TabWarlock />,
  wizard: <TabWizard />,
  spells: <TabSpells />,
  items: <TabItems />,
}

const initialCharacterData: CharacterDataType = {
  name: '',
  race: 0,
  characterClass: 0,
  experience: 0,
}

export default function Form() {
  const { loading, data } = useQuery<FetchedDataType>(GET_DATA);
  const methods = useForm({ defaultValues: initialCharacterData });
  const [activeTab, setActiveTab] = useState<TabNameType>('personal');
  const selectedClassId = methods.watch('characterClass');
  const selectedClassName = findClassName(data, selectedClassId);

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
            activeTab={activeTab}
            selectedClassName={selectedClassName}
            handleTabClick={handleTabClick}
          />
        </form>
      }
    </FormProvider>
  );
}

function findClassName(data: FetchedDataType | undefined, id: number): TabNameType {
  if (data) {
    const foundClass = data.characterClasses.find(characterClass =>
      characterClass.id === Number(id)
    );
    if (foundClass) return foundClass.name as TabNameType;
  }

  return 'characterClass';
}
