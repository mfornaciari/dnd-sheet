import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';
import type { OptionDataType } from '@/types';

type SelectProps = Readonly<{
  name: string,
  optionData: OptionDataType[],
}>

export default function Select ({ name, optionData }: SelectProps) {
  const { register } = useFormContext();
  const i18nName = i18next.t(name);

  return (
    <>
      <label htmlFor={name} className='field-label'><strong>{i18nName}</strong></label>

      <select id={name} className='field' {...register(name)}>
        {optionData.map(({ id, name }) =>
          <option key={id} value={id}>
            {i18next.t(name) as string}
          </option>
        )}
      </select>
    </>
  );
}
