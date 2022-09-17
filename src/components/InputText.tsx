type InputTextProps = {
  labelText: string,
  placeholderText: string,
}

export default ({ labelText, placeholderText }: InputTextProps) => {
  return (
    <div>
      <label htmlFor={`${labelText}Input`}>{labelText}</label>
      <input type='text' id={`${labelText}Input`} className='field' placeholder={placeholderText} />
    </div>
  )
}
