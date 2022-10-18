import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';
import { Container } from '@/components/Container';

type InputNumberProps = Readonly<{
  name: string;
  minValue?: string;
  maxValue?: string;
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

export function InputNumber({ name, minValue, maxValue, required }: InputNumberProps) {
  const { register, formState: { errors } } = useFormContext();
  const i18nName = i18next.t(name);
  const invalid = errors[name] ? true : false;

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
