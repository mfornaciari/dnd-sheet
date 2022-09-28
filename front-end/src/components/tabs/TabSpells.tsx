import i18next from "i18next";

export default function TabSpells() {
  const i18nName = i18next.t('spells');

  return (
    <div
      role='tabpanel'
      aria-labelledby='spells'
      aria-expanded='true'
      className='tab-panel'
    >
      {i18nName}
    </div>
  );
};
