import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { CharacterDataType } from '../types';
import FormTop from "./FormTop";

const initialCharacterData = {
  name: '',
  race: 0,
  class: 0,
  experience: 0
}

export default () => {
  const { register, watch } = useForm<CharacterDataType>({ defaultValues: initialCharacterData });
  const characterData = watch();

  useEffect(() => {
    const stringifiedCharacterData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedCharacterData);
  }, [characterData])

  return (
    <form>
      <FormTop characterData={characterData} register={register} />
    </form>
  );
}
