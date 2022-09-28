import i18next from 'i18next';

export default function TabPersonal() {
  const i18nName = i18next.t('personal');

  return (
    <div
      role='tabpanel'
      aria-labelledby='personal'
      aria-expanded='true'
      className='tab-panel'
    >
      {i18nName}
    </div>
  );
}
