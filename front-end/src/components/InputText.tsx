import { useFormContext } from 'react-hook-form';
import ContainerLabeled from '@/components/ContainerLabeled';

type InputTextProps = Readonly<{
  name: string;
  placeholderText: string;
}>;

export default function InputText({ name, placeholderText }: InputTextProps) {
  const { register } = useFormContext();

  return (
    <ContainerLabeled label={name}>
      <input type='text' id={name} placeholder={placeholderText} className='input' {...register(name)} />
    </ContainerLabeled>
  );
}
