import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FetchedDataType, CharacterDataType } from '@/types';
import FormTop from "@/components/FormTop";
import TabList from "@/components/TabList";
import TabPersonal from "@/components/TabPersonal";

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

const tabs = {
  personal: <TabPersonal />,
  attributes: <TabPersonal />,
  characterClass: <TabPersonal />,
  spells: <TabPersonal />,
  items: <TabPersonal />,
}

type TabsType = Readonly<typeof tabs>;

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
  const [activeTab, setActiveTab] = useState<keyof TabsType>('personal');

  useEffect(() => {
    const stringifiedData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedData);
  }, [characterData]);

  useEffect(() => {
    const tabButtons = document.querySelectorAll('.tab-button');
    for (const tabButton of tabButtons) {
      if (tabButton.id !== activeTab) {
        tabButton.setAttribute('aria-selected', 'false');
      } else {
        tabButton.setAttribute('aria-selected', 'true');
      }
    }
  }, [activeTab]);

  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const clickedTabName = event.currentTarget.id as keyof TabsType;
    console.log(clickedTabName)
    setActiveTab(prevActiveTab => clickedTabName);
  }

  if (loading) {
    return (
      <div role='status' aria-labelledby='loading-text' className='loading-div'>
        <p id='loading-text'><strong>Carregando...</strong></p>
      </div>
    );
  }

  return (
      <FormProvider {...methods}>
        { data &&
          <form>
            <FormTop fetchedData={data} />
            {tabs[activeTab]}
            <TabList handleTabClick={handleTabClick} />
          </form>
        }
      </FormProvider>
  );
}
