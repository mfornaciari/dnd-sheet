import { CharacterDataType } from "../types";

type InputNumberProps = Readonly<{
  labelText: string,
  minValue?: string,
  maxValue?: string,
  characterData: CharacterDataType,
  setCharacterData: Function,
  changedCharacterValue: string,
}>

export default ({ labelText, minValue, maxValue, characterData, setCharacterData, changedCharacterValue }: InputNumberProps) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement> ) {
    setCharacterData({...characterData, [changedCharacterValue]: event.currentTarget.value});
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isAllowed(event.key)) event.preventDefault();
  }

  function isAllowed(key: string): boolean {
    const allowedKeys = [
      'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ];
    return allowedKeys.includes(key);
  }

  return (
    <div>
      <label htmlFor={`${labelText}Input`}>
        {labelText}
      </label>
      <input
        type='number'
        id={`${labelText}Input`}
        min={minValue}
        max={maxValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className='field'
      />
    </div>
  )
}
