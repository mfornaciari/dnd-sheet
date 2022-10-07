import { useFormContext } from 'react-hook-form';
import Container from '@/components/Container';

type InputTextProps = Readonly<{
  name: string;
  placeholderText?: string;
}>;

export default function InputText({ name, placeholderText }: InputTextProps) {
  const { register } = useFormContext();

  return (
    <Container name={name} titled labeled>
      <input type='text' id={name} placeholder={placeholderText} className='input' {...register(name)} />
    </Container>
  );
}
