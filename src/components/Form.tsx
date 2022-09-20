import { useEffect, useState } from 'react';
import type { CharacterDataType } from '../types';
import FormTop from "./FormTop";

const initialCharacterData = {
  name: '',
  race: 0,
  class: 0,
  experience: 0
}

export default () => {
  const [characterData, setCharacterData] = useState<CharacterDataType>(initialCharacterData);

  useEffect(() => {
    const stringifiedCharacterData = JSON.stringify(characterData);
    localStorage.setItem('characterData', stringifiedCharacterData);
  }, [characterData])

  return (
    <form>
      <FormTop characterData={characterData} setCharacterData={setCharacterData} />
    </form>
  );
}