import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';

type InputTextProps = Readonly<{
  name: string,
  placeholderText: string,
}>

export default ({ name, placeholderText }: InputTextProps) => {
  const { register } = useFormContext();
  const i18nName = i18next.t(name);

  return (
    <div>
      <label htmlFor={name}><strong>{i18nName}</strong></label>

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
