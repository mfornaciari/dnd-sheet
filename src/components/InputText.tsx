import type { CharacterDataType } from '../types';

type InputTextProps = Readonly<{
  name: string,
  placeholderText: string,
  register: Function,
}>

export default ({ name, placeholderText, register }: InputTextProps) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>

      <input
        type='text'
        id={name}
        placeholder={placeholderText}
        className='field'
        {...register(name)}
      />
    </div>
  )
}
