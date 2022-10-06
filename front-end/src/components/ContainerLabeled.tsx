import i18next from 'i18next';
import type { PropsWithChildren } from 'react';

type FieldProps = {
  label: string;
};

export default function ContainerLabeled({ label, children }: PropsWithChildren<FieldProps>) {
  const styles = {
    padding: '0.7rem 0.3rem 0.1rem',
  };

  return (
    <div className='container' style={styles} role={label ? undefined : 'region'}>
      {label && (
        <label htmlFor={label} className='container-label'>
          <strong>{i18next.t(label) as string}</strong>
        </label>
      )}

      {children}
    </div>
  );
}
