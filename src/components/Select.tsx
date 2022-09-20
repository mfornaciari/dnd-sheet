import React from 'react';
import type { CharacterDataType } from '../types';

type SelectProps = Readonly<{
  name: string,
  optionNames: string[],
  register: Function,
}>

export default ({ name, optionNames, register }: SelectProps) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>

      <select id={name} className='field' {...register(name)}>
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
