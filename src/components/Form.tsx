import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormTop from "./FormTop";

const initialCharacterData = {
  name: '',
  race: 0,
  class: 0,
  experience: 0
}

export default () => {
  const { register, watch } = useForm({ defaultValues: initialCharacterData });
  const characterData = watch();

  useEffect(() => {
    const stringifiedData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedData);
  }, [characterData])

  return (
    <form>
      <FormTop characterData={characterData} register={register} />
    </form>
  );
}
