type InputTextProps = {
  readonly labelText: string,
  readonly placeholderText: string,
}

export default ({ labelText, placeholderText }: InputTextProps) => {
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
      />
    </div>
  )
}
