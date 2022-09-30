import { useFormContext } from 'react-hook-form';
import Field from '@/components/Field';

type InputTextProps = Readonly<{
  name: string,
  placeholderText: string,
}>

export default function InputText({ name, placeholderText }: InputTextProps) {
  const { register } = useFormContext();

  return (
    <Field label={name}>
      <input
        type='text'
        id={name}
        placeholder={placeholderText}
        className='field-input'
        {...register(name)}
      />
    </Field>
  );
}
