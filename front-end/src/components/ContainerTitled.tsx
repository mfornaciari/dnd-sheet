import i18next from 'i18next';
import type { PropsWithChildren } from 'react';
import '@/style/container.css';

type ContainerTitledProps = {
  name: string;
  nameIsLabel?: boolean;
};

export default function ContainerTitled({ name, nameIsLabel, children }: PropsWithChildren<ContainerTitledProps>) {
  const i18nName = i18next.t(name);

  return (
    <div className='container titled'>
      {nameIsLabel ? (
        <label htmlFor={name} className='container-name'>
          <strong>{i18nName}</strong>
        </label>
      ) : (
        <strong className='container-name'>{i18nName}</strong>
      )}

      {children}
    </div>
  );
}
