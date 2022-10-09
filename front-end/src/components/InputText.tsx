import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';
import Container from '@/components/Container';

type InputTextProps = Readonly<{
  name: string;
  placeholderText?: string;
  required?: boolean;
}>;

export default function InputText({ name, placeholderText, required }: InputTextProps) {
  const { register, formState: { errors } } = useFormContext();
  const i18nName = i18next.t(name);
  const invalid = errors[name] ? true : false;

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
