import { useFormContext } from 'react-hook-form';
import i18next from 'i18next';

type InputNumberProps = Readonly<{
  name: string,
  minValue?: string,
  maxValue?: string,
}>

export default function InputNumber({ name, minValue, maxValue }: InputNumberProps) {
  const { register } = useFormContext();
  const i18nName = i18next.t(name);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isAllowed(event.key)) event.preventDefault();
  }

  function isAllowed(key: string): boolean {
    const allowedKeys = [
      'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ];
    return allowedKeys.includes(key);
  }

  return (
    <div className='field-div' >
      <label htmlFor={name} className='field-label'><strong>{i18nName}</strong></label>

      <input
        type='number'
        id={name}
        min={minValue}
        max={maxValue}
        onKeyDown={handleKeyDown}
        className='field'
        {...register(name)}
      />
    </div>
  );
}
