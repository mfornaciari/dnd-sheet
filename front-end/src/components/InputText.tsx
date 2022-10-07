import { useFormContext } from 'react-hook-form';
import ContainerTitled from '@/components/ContainerTitled';

type InputTextProps = Readonly<{
  name: string;
  placeholderText: string;
}>;

export default function InputText({ name, placeholderText }: InputTextProps) {
  const { register } = useFormContext();

  return (
    <ContainerTitled name={name} nameIsLabel>
      <input type='text' id={name} placeholder={placeholderText} className='input' {...register(name)} />
    </ContainerTitled>
  );
}
