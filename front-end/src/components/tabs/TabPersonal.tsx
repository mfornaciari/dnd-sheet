import i18next from 'i18next';

export default function TabPersonal() {
  const i18nName = i18next.t('personal');

  return (
    <>{i18nName}</>
  );
}
