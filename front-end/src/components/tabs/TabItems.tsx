import i18next from "i18next";

export default function TabItems() {
  const i18nName = i18next.t('items');

  return (
    <div
      role='tabpanel'
      aria-labelledby='items'
      aria-expanded='true'
      className='tab-panel'
    >
      {i18nName}
    </div>
  );
};
