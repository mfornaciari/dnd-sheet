type InputNumberProps = {
  labelText: string,
  minValue?: string,
  maxValue?: string,
  setFormValue: Function,
}

export default ({ labelText, minValue, maxValue, setFormValue }: InputNumberProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!checkAllowed(event.key)) event.preventDefault();
  }

  const checkAllowed = (key: string): boolean => {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
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
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormValue(event.target.value)}
        className='field'
      />
    </div>
  )
}




