type InputNumberProps = {
  labelText: string,
  minValue: string,
}

export default ({ labelText, minValue }: InputNumberProps) => {
  return (
    <div>
      <label htmlFor={`${labelText}Input`}>{labelText}</label>
      <input type='number' id={`${labelText}Input`} className='field' min={minValue} />
    </div>
  )
}




