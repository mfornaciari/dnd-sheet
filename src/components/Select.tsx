type SelectProps = {
  labelText: string,
  optionNames: string[],
}

export default ({ labelText, optionNames }: SelectProps) => {
  return (
    <div>
      <label htmlFor={`${labelText}Select`}>{labelText}</label>
      <select id={`${labelText}Select`} className='field'>
        {optionNames.map((name, index) =>
          <option className='option' key={index} value={index}>{name}</option>
        )}
      </select>
    </div>
  )
}
