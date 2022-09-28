import i18next from "i18next";

export default function TabCharacterClass() {
  const i18nName = i18next.t('monk');

  return (
    <div
      role='tabpanel'
      aria-labelledby={i18nName}
      aria-expanded='true'
      className='tab-panel'
    >
      {i18nName}
    </div>
  );
};
