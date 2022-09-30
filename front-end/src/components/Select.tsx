import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';
import type { OptionDataType } from '@/types';
import Field from '@/components/Field';

type SelectProps = Readonly<{
  name: string,
  optionData: OptionDataType[],
}>

export default function Select ({ name, optionData }: SelectProps) {
  const { register } = useFormContext();

  return (
    <Field label={name}>
      <select id={name} className='field-input' {...register(name)}>
        {optionData.map(({ id, name }) =>
          <option key={id} value={id}>
            {i18next.t(name) as string}
          </option>
        )}
      </select>
    </Field>
  );
}
