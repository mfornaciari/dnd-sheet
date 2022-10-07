import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';
import type { OptionData } from '@/types';
import Container from '@/components/Container';

type SelectProps = Readonly<{
  name: string;
  optionData: OptionData[];
}>;

export default function Select({ name, optionData }: SelectProps) {
  const { register } = useFormContext();
  const optionElements = optionData.map(({ id, name }) => {
    const i18nName = i18next.t(name);
    const optionElement = (
      <option key={id} value={id}>
        {i18nName}
      </option>
    );
    return optionElement;
  });

  return (
    <Container name={name} titled labeled>
      <select id={name} className='input' {...register(name)}>
        {optionElements}
      </select>
    </Container>
  );
}
