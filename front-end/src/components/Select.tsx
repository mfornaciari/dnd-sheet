import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';
import type { Option } from '@/types';
import { Container } from '@/components/Container';

type SelectProps = Readonly<{
  name: string;
  optionData: Option[];
  required?: boolean;
}>;

export default function Select({ name, optionData, required }: SelectProps) {
  const { register, formState: { errors } } = useFormContext();
  const i18nName = i18next.t(name);
  const invalid = errors[name] ? true : false;

  const optionElements = optionData.map(({ name, id }) => {
    const i18nOptionName = i18next.t(name);
    return (
      <option key={id} value={id}>
        {i18nOptionName}
      </option>
    );
  });

  return (
    <Container invalid={invalid}>
      <label htmlFor={name} className='container-name'>
        <strong>{i18nName}</strong>
      </label>

      <select id={name} className='input' {...register(name, { required: required })}>
        {optionElements}
      </select>
    </Container>
  );
}
