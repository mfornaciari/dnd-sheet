import i18next from 'i18next';

type SelectProps = Readonly<{
  name: string,
  optionNames: string[],
  register: Function,
}>

export default ({ name, optionNames, register }: SelectProps) => {
  const i18nName = i18next.t(name);

  return (
    <div>
      <label htmlFor={name}>{i18nName}</label>

      <select id={name} className='field' {...register(name)}>
        {optionNames.map((name, index) =>
          <option key={index} value={index}>{name}</option>
        )}
      </select>
    </div>
  )
}
