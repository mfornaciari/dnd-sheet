import i18next from 'i18next';

type InputTextProps = Readonly<{
  name: string,
  placeholderText: string,
  register: Function,
}>

export default ({ name, placeholderText, register }: InputTextProps) => {
  const i18nName = i18next.t(name);

  return (
    <div>
      <label htmlFor={name}>{i18nName}</label>

      <input
        type='text'
        id={name}
        placeholder={placeholderText}
        className='field'
        {...register(name)}
      />
    </div>
  )
}
