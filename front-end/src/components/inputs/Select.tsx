import type { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import type { Option } from '@/types';
import i18next from 'i18next';
import { Container } from '@/components/Container';

type SelectProps = Readonly<{
  name: string;
  errors: FieldErrorsImpl<any>;
  optionData: Option[];
  register: UseFormRegister<any>;
  required?: boolean;
}>;

export function Select({ name, errors, optionData, register, required }: SelectProps) {
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
