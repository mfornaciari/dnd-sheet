import i18next from 'i18next';
import type { PropsWithChildren } from 'react';
import '@/style/Container.css';

type ContainerProps = {
  name: string;
  titled?: boolean;
  labeled?: boolean;
  error?: boolean;
};

export default function Container({ name, titled, labeled, error, children }: PropsWithChildren<ContainerProps>) {
  const i18nName = i18next.t(name);
  let className = titled ? 'container titled' : 'container untitled';
  if (error) className += ' error';
  const role = titled ? undefined : 'region';
  const ariaLabel = titled ? undefined : i18nName;

  const titleElement = labeled ? (
    <label htmlFor={name} className='container-name'>
      <strong>{i18nName}</strong>
    </label>
  ) : (
    <strong className='container-name'>{i18nName}</strong>
  );

  return (
    <div className={className} role={role} aria-label={ariaLabel}>
      {titled && titleElement}
      {children}
    </div>
  );
}
