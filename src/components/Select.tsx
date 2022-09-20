import React from 'react';
import type { CharacterDataType } from '../types';

type SelectProps = Readonly<{
  labelText: string,
  optionNames: string[],
  characterData: CharacterDataType,
  setCharacterData: Function,
  changedCharacterValue: string,
}>

export default ({ labelText, optionNames, characterData, setCharacterData, changedCharacterValue }: SelectProps) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCharacterData({ ...characterData, [changedCharacterValue]: event?.currentTarget.value })
  }

  return (
    <div>
      <label htmlFor={`${labelText}Select`}>
        {labelText}
      </label>

      <select id={`${labelText}Select`} onChange={handleChange} className='field'>
        {optionNames.map((name, index) =>
          <option
            key={index}
            value={index}
            className='option'
          >
            {name}
          </option>
        )}
      </select>
    </div>
  )
}
