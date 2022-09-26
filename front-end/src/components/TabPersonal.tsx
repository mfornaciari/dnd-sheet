import i18next from 'i18next';

export default() => {
  const i18nName = i18next.t('personal');

  return (
    <div
      role='tabpanel'
      aria-labelledby={i18nName}
      aria-label={i18next.t('tabpanels.personal')}
      aria-expanded='true'
      className='tab-panel'
    >
      {i18nName}
    </div>
  );
}
