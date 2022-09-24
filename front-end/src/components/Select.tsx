import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';
import type { OptionDataType } from '../types';

type SelectProps = Readonly<{
  name: string,
  optionData: OptionDataType[],
}>

export default ({ name, optionData }: SelectProps) => {
  const { register } = useFormContext();
  const i18nName = i18next.t(name);

  return (
    <div>
      <label htmlFor={name}>{i18nName}</label>

      <select id={name} className='field' {...register(name)}>
        {optionData.map(({ id, name }) =>
          <option key={id} value={id}>{name}</option>
        )}
      </select>
    </div>
  )
}
