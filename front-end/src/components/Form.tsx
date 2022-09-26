import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { FetchedDataType, CharacterDataType } from '@/types';
import FormTop from "@/components/FormTop";

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

  useEffect(() => {
    const stringifiedData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedData);
  }, [characterData]);

  if (loading) return (
    <div role='status' aria-labelledby='loading-text' className='loading-div'>
      <p id='loading-text'><strong>Carregando...</strong></p>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form>
        {data && <FormTop fetchedData={data} />}
      </form>
    </FormProvider>
  );
}
