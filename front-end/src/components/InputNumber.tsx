import { useFormContext } from 'react-hook-form';
import ContainerLabeled from '@/components/ContainerLabeled';

type InputNumberProps = Readonly<{
  name: string;
  minValue?: string;
  maxValue?: string;
}>;

export default function InputNumber({ name, minValue, maxValue }: InputNumberProps) {
  const { register } = useFormContext();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isAllowed(event.key)) event.preventDefault();
  }

  function isAllowed(key: string): boolean {
    const allowedKeys = [
      'ArrowLeft',
      'ArrowRight',
      'Backspace',
      'Delete',
      'Tab',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ];
    return allowedKeys.includes(key);
  }

  return (
    <ContainerLabeled label={name}>
      <input
        type='number'
        id={name}
        min={minValue}
        max={maxValue}
        onKeyDown={handleKeyDown}
        className='input'
        {...register(name)}
      />
    </ContainerLabeled>
  );
}
