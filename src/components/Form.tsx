import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { CharacterDataType } from '../types';
import FormTop from "./FormTop";

const initialCharacterData: CharacterDataType = {
  name: '',
  race: 0,
  class: 0,
  experience: 0
}

export default () => {
  const methods = useForm({ defaultValues: initialCharacterData });
  const characterData = methods.watch();

  useEffect(() => {
    const stringifiedData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedData);
  }, [characterData])

  return (
    <FormProvider { ...methods }>
      <form>
        <FormTop />
      </form>
    </FormProvider>
  );
}
