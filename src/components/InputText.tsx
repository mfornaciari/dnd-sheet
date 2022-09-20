import type { characterDataType } from '../types';

type InputTextProps = Readonly<{
  labelText: string,
  placeholderText: string,
  characterData: characterDataType,
  setCharacterData: Function,
  changedCharacterValue: string,
}>

export default ({ labelText, placeholderText, characterData, setCharacterData, changedCharacterValue }: InputTextProps) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCharacterData({ ...characterData, [changedCharacterValue]: event?.currentTarget.value })
  }

  return (
    <div>
      <label htmlFor={`${labelText}Input`}>
        {labelText}
      </label>

      <input
        type='text'
        id={`${labelText}Input`}
        placeholder={placeholderText}
        className='field'
        onChange={handleChange}
      />
    </div>
  )
}
