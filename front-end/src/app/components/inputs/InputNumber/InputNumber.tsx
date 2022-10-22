import type { UseFormRegister } from 'react-hook-form';
import i18next from 'i18next';
import { Container } from '@/app/components';

type InputNumberProps = Readonly<{
  name: string;
  error?: any; // TODO: Remove "any"
  minValue?: string;
  maxValue?: string;
  register: UseFormRegister<any>; // TODO: Remove "any"
  required?: boolean;
}>;

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

export function InputNumber({
  name,
  error,
  minValue,
  maxValue,
  register,
  required
}: InputNumberProps) {
  const i18nName = i18next.t(name);
  const invalid = error ? true : false;

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isAllowed(event.key)) event.preventDefault();
  }

  return (
    <Container invalid={invalid}>
      <label htmlFor={name} className='container-name'>
        <strong>{i18nName}</strong>
      </label>

      <input
        type='number'
        id={name}
        min={minValue}
        max={maxValue}
        onKeyDown={handleKeyDown}
        className='input'
        {...register(name, { required: required })}
      />
    </Container>
  );
}
