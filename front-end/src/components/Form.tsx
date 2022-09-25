import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FetchedDataType, CharacterDataType } from '@/types';
import FormTop from "@/components/FormTop";

const initialFetchedData: FetchedDataType = {
  characterClasses: [],
  races: [],
  levels: [],
}

const initialCharacterData: CharacterDataType = {
  name: '',
  race: 0,
  class: 0,
  experience: 0,
}

const postBody = {
  query: '{ characterClasses { id name } races { id name } levels { id level minExperience maxExperience } }'
}

const fetchInit = {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify(postBody),
}

export default () => {
  const [fetchedData, setFetchedData] = useState(initialFetchedData);
  const methods = useForm({ defaultValues: initialCharacterData });
  const characterData = methods.watch();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const stringifiedData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedData);
  }, [characterData]);

  async function fetchData() {
    const response = await fetch('http://localhost:3001/graphql', fetchInit);
    const jsonResponse = await response.json();
    const data: FetchedDataType = jsonResponse.data;
    setFetchedData(previousFetchedData => data);
  }

  return (
    <FormProvider {...methods}>
      <form>
        <FormTop fetchedData={fetchedData} />
      </form>
    </FormProvider>
  );
}
