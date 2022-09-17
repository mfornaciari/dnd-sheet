type InputNumberProps = {
  labelText: string,
  minValue: string,
  maxValue: string,
}

export default ({ labelText, minValue, maxValue }: InputNumberProps) => {
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
        className='field'
      />
    </div>
  )
}




