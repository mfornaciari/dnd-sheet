import i18next from "i18next";

export default function TabItems() {
  const i18nName = i18next.t('items');

  return (
    <>{i18nName}</>
  );
};
