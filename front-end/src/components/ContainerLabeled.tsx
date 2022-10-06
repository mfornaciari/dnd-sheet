import i18next from 'i18next';
import type { PropsWithChildren } from 'react';

type FieldProps = {
  label: string;
  small?: boolean;
};

export default function ContainerLabeled({ label, small, children }: PropsWithChildren<FieldProps>) {
  const styles = {
    padding: '0.7rem 0.3rem 0.1rem',
    flexBasis: small ? '50%' : '100%',
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
