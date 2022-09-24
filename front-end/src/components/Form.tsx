import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FetchedDataType, CharacterDataType } from '../types';
import FormTop from "./FormTop";

const initialCharacterData: CharacterDataType = {
  name: '',
  race: 0,
  class: 0,
  experience: 0,
}

const initialFetchedData: FetchedDataType = {
  characterClasses: [],
  races: [],
  levels: [],
}

const query = {
  query:
    'query { characterClasses { id name } races { id name } levels { level minExperience maxExperience} }'
}

const fetchInit = {
  method: 'POST',
  body: JSON.stringify(query),
}

export default () => {
  const methods = useForm({ defaultValues: initialCharacterData });
  const [fetchedData, setFetchedData] = useState(initialFetchedData);
  const characterData = methods.watch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/graphql', fetchInit);
      const jsonResponse = await response.json();
      setFetchedData(previousFetchedData => jsonResponse.data);
    }
    fetchData();
  });

  useEffect(() => {
    const stringifiedData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedData);
  }, [characterData]);

  return (
    <FormProvider {...methods}>
      <form>
        <FormTop fetchedData={fetchedData} />
      </form>
    </FormProvider>
  );
}
