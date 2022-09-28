import i18next from "i18next";

export default function TabAttributes() {
  const i18nName = i18next.t('attributes');

  return (
    <div
      role='tabpanel'
      aria-labelledby='attributes'
      aria-expanded='true'
      className='tab-panel'
    >
      {i18nName}
    </div>
  );
};
