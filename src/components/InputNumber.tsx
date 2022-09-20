type InputNumberProps = Readonly<{
  name: string,
  minValue?: string,
  maxValue?: string,
  register: Function,
}>

export default ({ name, minValue, maxValue, register }: InputNumberProps) => {
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
      <label htmlFor={name}>{name}</label>

      <input
        type='number'
        id={name}
        min={minValue}
        max={maxValue}
        onKeyDown={handleKeyDown}
        className='field'
        {...register(name)}
      />
    </div>
  )
}
