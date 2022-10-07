import i18next from 'i18next';
import type { PropsWithChildren } from 'react';
import '@/style/container.css';

type ContainerUntitledProps = {
  name: string;
};

export default function ContainerUntitled({ name, children }: PropsWithChildren<ContainerUntitledProps>) {
  const i18nName = i18next.t(name);

  return (
    <div className='container untitled' role='region' aria-label={i18nName}>
      {children}
    </div>
  );
}
