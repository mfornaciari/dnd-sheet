import i18next from 'i18next';
import type { PropsWithChildren } from 'react';

type FieldProps = {
  name: string;
  small?: boolean;
};

export default function ContainerUnlabeled({ name, small, children }: PropsWithChildren<FieldProps>) {
  const styles = {
    padding: '0.1rem 0.3rem',
    flexBasis: small ? '50%' : '100%',
  };
  const i18nName = i18next.t(name);

  return (
    <div className='container' style={styles} role='region' aria-label={i18nName}>
      {children}
    </div>
  );
}
