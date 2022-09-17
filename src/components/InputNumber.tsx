type InputNumberProps = {
  labelText: string,
  minValue: string,
  maxValue: string,
  handleChange: Function,
}

export default ({ labelText, minValue, maxValue, handleChange }: InputNumberProps) => {
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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
        className='field'
      />
    </div>
  )
}




