import type { UseFormRegister } from 'react-hook-form';
import i18next from 'i18next';
import { Container } from '@/app/components';

type InputTextProps = Readonly<{
  name: string;
  error?: any;
  placeholderText?: string;
  register: UseFormRegister<any>;
  required?: boolean;
}>;

export function InputText({ name, error, placeholderText, register, required }: InputTextProps) {
  const i18nName = i18next.t(name);
  const invalid = error ? true : false;

  return (
    <Container invalid={invalid}>
      <label htmlFor={name} className='container-name'>
        <strong>{i18nName}</strong>
      </label>

      <input
        type='text'
        id={name}
        placeholder={placeholderText}
        className='input'
        {...register(name, { required: required })}
      />
    </Container>
  );
}
