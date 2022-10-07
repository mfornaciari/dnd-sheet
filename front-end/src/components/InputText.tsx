import { useFormContext } from 'react-hook-form';
import Container from '@/components/Container';

type InputTextProps = Readonly<{
  name: string;
  placeholderText?: string;
  required: boolean;
}>;

export default function InputText({ name, placeholderText, required }: InputTextProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Container name={name} titled labeled error={errors[name] ? true : undefined}>
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
