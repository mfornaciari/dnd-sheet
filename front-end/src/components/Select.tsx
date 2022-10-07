import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';
import type { OptionData } from '@/types';
import ContainerTitled from '@/components/ContainerTitled';

type SelectProps = Readonly<{
  name: string;
  optionData: OptionData[];
}>;

export default function Select({ name, optionData }: SelectProps) {
  const { register } = useFormContext();

  return (
    <ContainerTitled name={name} nameIsLabel>
      <select id={name} className='input' {...register(name)}>
        {optionData.map(({ id, name }) => (
          <option key={id} value={id}>
            {i18next.t(name) as string}
          </option>
        ))}
      </select>
    </ContainerTitled>
  );
}
