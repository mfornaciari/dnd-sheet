import i18next from "i18next";

export default function TabSpells() {
  const i18nName = i18next.t('spells');

  return (
    <>{i18nName}</>
  );
};
