import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FetchedDataType, CharacterDataType, TabsType, TabNameType } from '@/types';
import FormTop from '@/components/FormTop';
import TabList from '@/components/TabList';
import TabPersonal from '@/components/TabPersonal';
import TabAttributes from '@/components/TabAttributes';
import TabCharacterClass from '@/components/TabCharacterClass';
import TabSpells from '@/components/TabSpells';
import TabItems from '@/components/TabItems';

export const GET_DATA = gql`
  query GetData {
    races {
      id
      name
    }
    characterClasses {
      id
      name
    }
    levels {
      id
      level
      minExperience
      maxExperience
    }
  }
`;

const tabs: TabsType = {
  personal: <TabPersonal />,
  attributes: <TabAttributes />,
  characterClass: <TabCharacterClass />,
  spells: <TabSpells />,
  items: <TabItems />,
}

const initialCharacterData: CharacterDataType = {
  name: '',
  race: 0,
  class: 0,
  experience: 0,
}

export default () => {
  const { loading, data } = useQuery<FetchedDataType>(GET_DATA);
  const methods = useForm({ defaultValues: initialCharacterData });
  const characterData = methods.watch();
  const [activeTab, setActiveTab] = useState<TabNameType>('personal');

  useEffect(() => {
    const stringifiedData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedData);
  }, [characterData]);

  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const clickedTabName = event.currentTarget.name as TabNameType;
    setActiveTab(prevActiveTab => clickedTabName);
  }

  if (loading) {
    return (
      <div role='status' aria-labelledby='loading-text' className='loading-div'>
        <p id='loading-text' className='loading-text'><strong>Carregando...</strong></p>
      </div>
    );
  }

  return (
      <FormProvider {...methods}>
        { data &&
          <form>
            <FormTop fetchedData={data} />
            {tabs[activeTab]}
            <TabList activeTab={activeTab} handleTabClick={handleTabClick} />
          </form>
        }
      </FormProvider>
  );
}
